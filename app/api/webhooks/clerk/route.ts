import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
      throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing svix headers:', { svix_id, svix_timestamp, svix_signature });
      return new Response('Missing svix headers', {
        status: 400
      })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new Response('Error verifying webhook', {
        status: 400
      })
    }

    const eventType = evt.type;
    console.log('Processing webhook event:', eventType);

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name } = evt.data;

      if (!email_addresses?.[0]?.email_address) {
        console.error('No email address found in webhook data');
        return new Response('No email address found', { status: 400 });
      }

      const user = await prisma.user.upsert({
        where: { id: id as string },
        create: {
          id: id as string,
          email: email_addresses[0].email_address,
          firstName: first_name || null,
          lastName: last_name || null,
        },
        update: {
          email: email_addresses[0].email_address,
          firstName: first_name || null,
          lastName: last_name || null,
        },
      });

      console.log(`User ${eventType === 'user.created' ? 'created' : 'updated'}:`, user.id);
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;
      
      await prisma.user.delete({
        where: { id: id as string },
      });

      console.log('User deleted:', id);
    }

    return new Response('Webhook processed successfully', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 