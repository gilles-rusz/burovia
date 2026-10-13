const TYPES = {
  question: 'Question',
  temoignage: 'Témoignage',
  avis: 'Avis sur le site',
};

const echapper = (texte = '') =>
  String(texte).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

exports.envoyerMessage = async (req, res) => {
  const { nom, email, profil, message, type, publication, site } = req.body || {};

  if (site) return res.json({ success: true });

  if (!nom || !email || !message || String(message).trim().length < 10) {
    return res.status(400).json({ error: 'Merci de remplir ton prénom, ton e-mail et un message.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || String(message).length > 4000) {
    return res.status(400).json({ error: 'Ton e-mail ou ton message semble incorrect.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) {
    return res.status(503).json({ error: "Le formulaire n'est pas encore activé, réessaie un peu plus tard." });
  }

  const sujet = `[Les Capés du Bide] ${TYPES[type] || 'Message'} de ${String(nom).slice(0, 60)}`;
  const html = `
    <p><strong>Type :</strong> ${echapper(TYPES[type] || type)}</p>
    <p><strong>De :</strong> ${echapper(nom)} (${echapper(email)})</p>
    <p><strong>Profil :</strong> ${echapper(profil || 'non précisé')}</p>
    <p><strong>Accepte la publication :</strong> ${publication ? 'oui' : 'non'}</p>
    <hr>
    <p style="white-space:pre-wrap">${echapper(message)}</p>`;

  try {
    const reponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Les Capés du Bide <onboarding@resend.dev>',
        to: process.env.CONTACT_TO.split(',').map((a) => a.trim()),
        reply_to: email,
        subject: sujet,
        html,
      }),
    });
    if (!reponse.ok) {
      console.error('Erreur Resend :', reponse.status, await reponse.text());
      return res.status(502).json({ error: "L'envoi n'a pas marché, réessaie dans un moment." });
    }
    return res.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi contact :', error);
    return res.status(502).json({ error: "L'envoi n'a pas marché, réessaie dans un moment." });
  }
};
