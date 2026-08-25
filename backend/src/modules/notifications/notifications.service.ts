import prisma from "../../config/prisma";

export async function queueEmail(params: {
  application_id: number;
  recipient: string;
  subject: string;
  body: string;
  is_html?: boolean;
}) {
  await prisma.email_queue.create({
    data: {
      application_id: params.application_id,
      recipient: params.recipient,
      subject: params.subject,
      body: params.body,
      is_html: params.is_html ?? true,
    },
  });
}
