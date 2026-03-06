import { NextRequest, NextResponse } from 'next/server';
import { ServerClient } from 'postmark';
import { emailForwarding } from '@/lib/config';

// Postmark inbound webhook handler
// Receives emails and forwards them per config

// GET handler for Postmark webhook verification
export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Inbound webhook endpoint active' });
}

export async function POST(request: NextRequest) {
  // Read env vars at runtime (not build time) and trim whitespace
  const webhookSecret = process.env.INBOUND_WEBHOOK_SECRET?.trim();
  const postmarkToken = process.env.POSTMARK_SERVER_TOKEN?.trim();

  // Verify webhook secret (passed as query param)
  const secret = request.nextUrl.searchParams.get('secret')?.trim();

  if (!webhookSecret || secret !== webhookSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!postmarkToken) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  try {
    const payload = await request.json();

    const {
      From,
      FromName,
      Subject,
      TextBody,
      HtmlBody,
      ReplyTo,
      To,
      Cc,
      Attachments,
    } = payload;

    const client = new ServerClient(postmarkToken);

    await client.sendEmail({
      From: emailForwarding.senderAddress,
      To: emailForwarding.forwardTo,
      ReplyTo: ReplyTo || From,
      Subject: `[Forwarded] ${Subject || '(no subject)'}`,
      TextBody: TextBody
        ? `--- Forwarded from ${FromName ? `${FromName} <${From}>` : From} ---\nOriginal To: ${To}\n${Cc ? `Cc: ${Cc}\n` : ''}\n${TextBody}`
        : undefined,
      HtmlBody: HtmlBody
        ? `<p><em>--- Forwarded from ${FromName ? `${FromName} &lt;${From}&gt;` : From} ---</em><br>Original To: ${To}${Cc ? `<br>Cc: ${Cc}` : ''}</p><hr>${HtmlBody}`
        : undefined,
      Attachments: Attachments?.map((att: { Name: string; Content: string; ContentType: string }) => ({
        Name: att.Name,
        Content: att.Content,
        ContentType: att.ContentType,
      })),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log error without exposing details in response
    if (error instanceof Error) {
      process.stderr.write(`Email forwarding error: ${error.message}\n`);
    }
    return NextResponse.json({ error: 'Failed to forward email' }, { status: 500 });
  }
}
