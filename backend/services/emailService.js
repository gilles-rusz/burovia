const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const formatPrice = (cents) =>
  (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

const buildOrderRows = (items) =>
  items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #f1eee8;color:#1f2933;">
          ${item.name}
        </td>
        <td style="padding:10px 16px;border-bottom:1px solid #f1eee8;color:#52606d;text-align:center;">
          × ${item.quantity}
        </td>
        <td style="padding:10px 16px;border-bottom:1px solid #f1eee8;color:#1f2933;text-align:right;font-weight:700;">
          ${formatPrice(item.unit_price_cents * item.quantity)}
        </td>
      </tr>`
    )
    .join('');

const buildHtml = (order) => {
  const addressParts = [
    order.shipping_address_line1,
    [order.shipping_postal_code, order.shipping_city].filter(Boolean).join(' '),
    order.shipping_country_code,
  ].filter(Boolean);

  const addressHtml = addressParts.length
    ? `<p style="margin:0;color:#52606d;line-height:1.6;">${addressParts.join('<br>')}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6f4ef;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f4ef;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1f2933;border-radius:20px 20px 0 0;padding:32px 40px;text-align:center;">
            <span style="font-size:2rem;font-weight:900;color:#ffffff;letter-spacing:-0.04em;">Burovia</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px 40px 32px;">

            <h1 style="margin:0 0 8px;font-size:1.5rem;color:#111827;letter-spacing:-0.03em;">
              Merci pour votre commande !
            </h1>
            <p style="margin:0 0 28px;color:#52606d;font-size:1rem;line-height:1.6;">
              Bonjour ${order.customer_name || 'cher client'},<br>
              Votre commande <strong>#${order.id}</strong> a bien été reçue et votre paiement confirmé via Stripe.
            </p>

            <!-- Articles -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border:1px solid #e5e0d8;border-radius:14px;overflow:hidden;margin-bottom:24px;">
              <thead>
                <tr style="background:#f6f4ef;">
                  <th style="padding:10px 16px;text-align:left;font-size:0.78rem;font-weight:800;
                             text-transform:uppercase;letter-spacing:0.06em;color:#7c6f64;">Article</th>
                  <th style="padding:10px 16px;text-align:center;font-size:0.78rem;font-weight:800;
                             text-transform:uppercase;letter-spacing:0.06em;color:#7c6f64;">Qté</th>
                  <th style="padding:10px 16px;text-align:right;font-size:0.78rem;font-weight:800;
                             text-transform:uppercase;letter-spacing:0.06em;color:#7c6f64;">Prix</th>
                </tr>
              </thead>
              <tbody>
                ${buildOrderRows(order.items)}
              </tbody>
              <tfoot>
                <tr style="background:#f6f4ef;">
                  <td colspan="2" style="padding:12px 16px;font-weight:800;color:#111827;">Total</td>
                  <td style="padding:12px 16px;font-weight:900;color:#111827;text-align:right;font-size:1.1rem;">
                    ${formatPrice(order.total_amount_cents)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <!-- Adresse -->
            ${addressHtml ? `
            <div style="margin-bottom:24px;">
              <p style="margin:0 0 6px;font-size:0.8rem;font-weight:800;text-transform:uppercase;
                        letter-spacing:0.06em;color:#7c6f64;">Adresse de livraison</p>
              ${addressHtml}
            </div>` : ''}

            <!-- Infos livraison -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#f6f4ef;border-radius:14px;border:1px solid #e5e0d8;
                          margin-bottom:28px;">
              <tr>
                <td style="padding:18px 20px;">
                  <p style="margin:0 0 8px;color:#1f2933;">
                    🚚 <strong>Livraison estimée entre 5 et 10 jours ouvrés</strong>
                  </p>
                  <p style="margin:0 0 8px;color:#52606d;font-size:0.9rem;">
                    Livraison disponible en France, Belgique et Luxembourg (FR · BE · LU).
                  </p>
                  <p style="margin:0;color:#52606d;font-size:0.9rem;">
                    🔒 Paiement 100% sécurisé et confirmé via <strong>Stripe</strong>.
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin:0;color:#52606d;font-size:0.9rem;line-height:1.6;">
              Une question ? Contactez-nous à
              <a href="mailto:contact@burovia.fr"
                 style="color:#1f2933;font-weight:700;">contact@burovia.fr</a>
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#111827;border-radius:0 0 20px 20px;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:0.82rem;line-height:1.6;">
              © 2026 Burovia · Un projet <strong style="color:#d1d5db;">Web RG Est</strong><br>
              Accessoires de télétravail · FR · BE · LU
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
};

exports.sendOrderConfirmation = async (order) => {
  if (!order.customer_email) {
    console.warn(`[email] Commande #${order.id} : pas d'email client, envoi ignoré.`);
    return;
  }

  await transporter.sendMail({
    from: `"Burovia" <${process.env.EMAIL_FROM}>`,
    to: order.customer_email,
    subject: `Confirmation de votre commande Burovia #${order.id}`,
    html: buildHtml(order),
  });

  console.log(`[email] Confirmation envoyée à ${order.customer_email} pour la commande #${order.id}`);
};
