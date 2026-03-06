import sharp from 'sharp';
import { readdir, stat, rename, unlink, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IMAGES_DIR = join(__dirname, '..', 'public', 'images');

// Configuration
const MIN_SIZE_TO_OPTIMIZE = 50 * 1024; // 50KB - skip small images
const DEFAULT_MAX_WIDTH = 1920;
const DEFAULT_JPEG_QUALITY = 80;
const DEFAULT_PNG_QUALITY = 85;

/**
 * Auto-discover images that need optimization
 * - Only includes jpg, jpeg, and png files
 * - Skips files with '-original' suffix (backups)
 * - Skips .webp files (already optimized output)
 * - Skips files below the minimum size threshold
 */
async function discoverImages() {
  const files = await readdir(IMAGES_DIR);
  const images = [];

  for (const file of files) {
    // Only process jpg, jpeg, and png files
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    // Skip original backups
    if (file.includes('-original')) continue;

    // Skip WebP outputs
    if (file.endsWith('.webp')) continue;

    const filePath = join(IMAGES_DIR, file);
    const stats = await stat(filePath);

    if (stats.size >= MIN_SIZE_TO_OPTIMIZE) {
      // Determine quality based on file type
      const isPng = /\.png$/i.test(file);
      images.push({
        src: file,
        maxWidth: DEFAULT_MAX_WIDTH,
        quality: isPng ? DEFAULT_PNG_QUALITY : DEFAULT_JPEG_QUALITY,
      });
    } else {
      console.log(`Skipping ${file} - below size threshold (${(stats.size / 1024).toFixed(1)} KB < ${MIN_SIZE_TO_OPTIMIZE / 1024} KB)`);
    }
  }

  return images;
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Calculate percentage reduction with division-by-zero protection
 */
function calculateReduction(original, optimized) {
  if (original === 0) return 0;
  return Math.round((1 - optimized / original) * 100);
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

async function optimizeImage({ src, maxWidth, quality }) {
  const inputPath = join(IMAGES_DIR, src);
  const ext = src.split('.').pop();
  const baseName = src.replace(`.${ext}`, '');
  const outputPath = join(IMAGES_DIR, `${baseName}.webp`);
  const backupPath = join(IMAGES_DIR, `${baseName}-original.${ext}`);

  // Idempotency check - skip if already processed
  if (await fileExists(outputPath)) {
    console.log(`\nSkipping: ${src} - WebP output already exists`);
    return { src, success: true, skipped: true };
  }

  if (await fileExists(backupPath)) {
    console.log(`\nSkipping: ${src} - backup already exists (previously processed)`);
    return { src, success: true, skipped: true };
  }

  try {
    const inputStats = await stat(inputPath);
    console.log(`\nProcessing: ${src} (${(inputStats.size / 1024 / 1024).toFixed(2)} MB)`);

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    const needsResize = metadata.width > maxWidth;

    // Optimize
    let pipeline = sharp(inputPath);

    if (needsResize) {
      pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality })
      .toFile(outputPath);

    const outputStats = await stat(outputPath);
    const savings = calculateReduction(inputStats.size, outputStats.size);

    console.log(`  → ${baseName}.webp (${formatBytes(outputStats.size)}) - ${savings}% smaller`);

    // Backup original (rename to -original)
    try {
      await rename(inputPath, backupPath);
      console.log(`  → Backed up original to ${baseName}-original.${ext}`);
    } catch (renameError) {
      // If backup fails, clean up the WebP output and report failure
      console.error(`  ✗ Failed to backup original: ${renameError.message}`);
      try {
        await unlink(outputPath);
        console.log(`  → Cleaned up WebP output after backup failure`);
      } catch {
        // Ignore cleanup errors
      }
      return { src, success: false, error: renameError.message };
    }

    return { src, success: true, savings };
  } catch (error) {
    console.error(`  ✗ Failed: ${error.message}`);
    // Clean up any partial WebP output on failure
    try {
      await unlink(outputPath);
    } catch {
      // Ignore cleanup errors - file may not exist
    }
    return { src, success: false, error: error.message };
  }
}

async function main() {
  // Verify images directory exists
  if (!(await fileExists(IMAGES_DIR))) {
    console.error(`Error: Images directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  console.log('Image Optimization Script\n');
  console.log('Auto-discovering images to optimize...\n');

  // Auto-discover images instead of using hardcoded list
  const imagesToOptimize = await discoverImages();

  if (imagesToOptimize.length === 0) {
    console.log('No images found that need optimization.');
    return;
  }

  console.log(`\nFound ${imagesToOptimize.length} image(s) to optimize:\n`);
  imagesToOptimize.forEach(img => console.log(`  - ${img.src}`));
  console.log('\nConverting to WebP format...');

  const results = [];

  for (const config of imagesToOptimize) {
    const result = await optimizeImage(config);
    results.push(result);
  }

  console.log('\n--- Summary ---');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✓ ${successful.length} images optimized`);
  if (failed.length > 0) {
    console.log(`✗ ${failed.length} images failed`);
  }

  console.log('\n⚠️  Remember to update image references in components to use .webp extension!');
}

main().catch((error) => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});

// Export functions for testing (ES module style)
export { optimizeImage, formatBytes, calculateReduction, fileExists, discoverImages };
