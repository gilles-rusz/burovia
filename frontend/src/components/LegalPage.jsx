const CONTENT = {
  mentions: {
    title: 'Mentions légales',
    sections: [
      {
        heading: 'Éditeur du site',
        body: (
          <>
            <p>
              Le site <strong>burovia.fr</strong> est édité par{' '}
              <strong>Gilles Ruszczycki</strong>, entrepreneur individuel,
              immatriculé sous le numéro SIRET&nbsp;: 989&nbsp;861&nbsp;869&nbsp;00018
              (SIREN&nbsp;: 989&nbsp;861&nbsp;869), dont le siège est situé au{' '}
              17 rue de la Division Leclerc, 57280 Maizières-lès-Metz, France.
            </p>
            <p>Activité déclarée : Programmation informatique (code NAF 6201Z).</p>
            <p>Directeur de la publication : Gilles Ruszczycki</p>
            <p>
              Contact :{' '}
              <a href="mailto:contact@burovia.fr">contact@burovia.fr</a>
            </p>
          </>
        ),
      },
      {
        heading: 'Hébergement',
        body: (
          <p>
            Informations d'hébergement à compléter.
          </p>
        ),
      },
      {
        heading: 'Propriété intellectuelle',
        body: (
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, logos,
            structure) est protégé par le droit d'auteur et appartient à Gilles Ruszczycki.
            Toute reproduction, même partielle, est interdite sans autorisation
            préalable écrite.
          </p>
        ),
      },
      {
        heading: 'Responsabilité',
        body: (
          <p>
            Burovia s'efforce de maintenir les informations du site à jour et
            exactes. Toutefois, la responsabilité de l'éditeur ne saurait être
            engagée en cas d'erreur ou d'omission. Les liens vers des sites tiers
            sont fournis à titre informatif uniquement.
          </p>
        ),
      },
    ],
  },

  cgv: {
    title: 'Conditions Générales de Vente',
    sections: [
      {
        heading: '1. Identification du vendeur',
        body: (
          <p>
            <strong>Gilles Ruszczycki</strong>, entrepreneur individuel.<br />
            SIRET : 989&nbsp;861&nbsp;869&nbsp;00018 — SIREN : 989&nbsp;861&nbsp;869<br />
            TVA intracommunautaire : FR71989861869<br />
            Adresse : 17 rue de la Division Leclerc, 57280 Maizières-lès-Metz, France.<br />
            E-mail : contact@burovia.fr
          </p>
        ),
      },
      {
        heading: '2. Produits et prix',
        body: (
          <p>
            Les produits proposés sur Burovia sont des accessoires de télétravail
            (confort, posture, organisation). Les prix sont indiqués en euros TTC.
            Burovia se réserve le droit de modifier ses prix à tout moment ; les
            produits sont facturés sur la base du tarif en vigueur au moment de la
            validation de la commande.
          </p>
        ),
      },
      {
        heading: '3. Commande et paiement',
        body: (
          <>
            <p>
              La commande est validée après confirmation du paiement. Le paiement
              s'effectue exclusivement via <strong>Stripe</strong>, plateforme
              sécurisée certifiée PCI-DSS. Les données bancaires ne transitent pas
              par nos serveurs et ne sont pas conservées par Burovia.
            </p>
            <p>Moyens de paiement acceptés : carte bancaire (Visa, Mastercard, CB).</p>
          </>
        ),
      },
      {
        heading: '4. Livraison',
        body: (
          <>
            <p>
              Les livraisons s'effectuent en <strong>France métropolitaine</strong>,
              en <strong>Belgique</strong> et au <strong>Luxembourg</strong>. Le
              délai estimé est de <strong>5 à 10 jours ouvrés</strong> à compter de
              la confirmation de commande.
            </p>
            <p>
              Les frais de livraison sont indiqués lors du passage en caisse. En
              cas de retard imputable au transporteur, Burovia ne peut être tenu
              responsable.
            </p>
          </>
        ),
      },
      {
        heading: '5. Droit de rétractation',
        body: (
          <p>
            Conformément à la réglementation européenne, vous disposez d'un délai
            de <strong>14 jours calendaires</strong> à compter de la réception de
            votre commande pour exercer votre droit de rétractation, sans avoir à
            justifier de motifs ni à payer de pénalités. Voir la page dédiée
            « Droit de rétractation » pour la procédure complète.
          </p>
        ),
      },
      {
        heading: '6. Garanties légales',
        body: (
          <p>
            Tous nos produits bénéficient de la garantie légale de conformité
            (2 ans — Art. L217-4 et suivants du Code de la consommation) et de la
            garantie contre les vices cachés (Art. 1641 et suivants du Code civil).
          </p>
        ),
      },
      {
        heading: '7. Litiges',
        body: (
          <p>
            En cas de litige non résolu à l'amiable, vous pouvez recourir à la
            médiation de la consommation. Pour les consommateurs de l'Union
            européenne, la plateforme de règlement en ligne des litiges (RLL) est
            accessible sur ec.europa.eu/consumers/odr. Le droit français est
            applicable aux présentes CGV.
          </p>
        ),
      },
    ],
  },

  confidentialite: {
    title: 'Politique de confidentialité',
    sections: [
      {
        heading: 'Responsable du traitement',
        body: (
          <p>
            <strong>Gilles Ruszczycki</strong>, entrepreneur individuel —
            SIRET : 989&nbsp;861&nbsp;869&nbsp;00018 —
            17 rue de la Division Leclerc, 57280 Maizières-lès-Metz, France.<br />
            Contact : <a href="mailto:contact@burovia.fr">contact@burovia.fr</a><br />
            Les présentes règles sont conformes au Règlement Général sur la
            Protection des Données (RGPD — UE 2016/679) et à la loi Informatique
            et Libertés.
          </p>
        ),
      },
      {
        heading: 'Données collectées',
        body: (
          <ul>
            <li>Données de commande : nom, prénom, adresse de livraison, e-mail.</li>
            <li>Données de paiement : traitées directement par Stripe, non stockées par Burovia.</li>
            <li>Données de navigation : adresse IP, pages visitées (via logs serveur).</li>
          </ul>
        ),
      },
      {
        heading: 'Finalités et base légale',
        body: (
          <ul>
            <li>Exécution des commandes (base : exécution du contrat).</li>
            <li>Envoi de confirmations de commande (base : exécution du contrat).</li>
            <li>Obligations légales comptables et fiscales (base : obligation légale).</li>
          </ul>
        ),
      },
      {
        heading: 'Durée de conservation',
        body: (
          <p>
            Les données de commande sont conservées 3 ans à compter de la dernière
            commande, puis archivées 5 ans pour satisfaire aux obligations
            comptables légales.
          </p>
        ),
      },
      {
        heading: 'Partage avec des tiers',
        body: (
          <p>
            Vos données sont partagées uniquement avec les prestataires nécessaires
            à l'exécution de la commande : <strong>Stripe</strong> (paiement),
            <strong>transporteurs</strong> (livraison), prestataires
            d'hébergement (infrastructure). Aucune vente ni cession à des tiers
            à des fins commerciales.
          </p>
        ),
      },
      {
        heading: 'Vos droits',
        body: (
          <>
            <p>
              Conformément au RGPD, vous disposez des droits d'accès, de
              rectification, d'effacement, de limitation, de portabilité et
              d'opposition concernant vos données.
            </p>
            <p>
              Exercice de ces droits : <a href="mailto:contact@burovia.fr">contact@burovia.fr</a>.
              En cas de réclamation non résolue, vous pouvez saisir la{' '}
              <strong>CNIL</strong> (France) ou l'autorité compétente de votre pays.
            </p>
          </>
        ),
      },
      {
        heading: 'Cookies',
        body: (
          <p>
            Le site utilise uniquement des cookies techniques essentiels au
            fonctionnement (panier, session). Aucun cookie publicitaire ni
            traceur tiers n'est déposé sans votre consentement.
          </p>
        ),
      },
    ],
  },

  livraison: {
    title: 'Livraison & Retours',
    sections: [
      {
        heading: 'Zones de livraison',
        body: (
          <p>
            Burovia livre en <strong>France métropolitaine</strong>,
            en <strong>Belgique</strong> et au <strong>Luxembourg</strong>.
            Les livraisons vers les DOM-TOM ou d'autres pays ne sont pas
            proposées à ce stade.
          </p>
        ),
      },
      {
        heading: 'Délais de livraison',
        body: (
          <>
            <p>
              Le délai habituel est de <strong>5 à 10 jours ouvrés</strong> après
              confirmation de votre commande et du paiement. Ce délai est indicatif
              et peut varier selon les disponibilités fournisseurs et les périodes
              de forte activité.
            </p>
            <p>
              Un e-mail de confirmation avec numéro de suivi vous est transmis dès
              l'expédition.
            </p>
          </>
        ),
      },
      {
        heading: 'Frais de livraison',
        body: (
          <p>
            Les frais de livraison sont calculés automatiquement et affichés lors
            du passage en caisse, avant la validation de votre commande.
          </p>
        ),
      },
      {
        heading: 'Retours',
        body: (
          <>
            <p>
              Vous disposez de <strong>14 jours calendaires</strong> à compter de
              la réception pour retourner un article (droit de rétractation légal).
              L'article doit être retourné dans son état d'origine, non utilisé et
              dans son emballage d'origine.
            </p>
            <p>
              Pour initier un retour, contactez-nous à{' '}
              <a href="mailto:contact@burovia.fr">contact@burovia.fr</a> en
              précisant votre numéro de commande.
            </p>
          </>
        ),
      },
      {
        heading: 'Remboursements',
        body: (
          <p>
            Le remboursement est effectué dans un délai de <strong>14 jours</strong>{' '}
            à compter de la réception du retour, via le moyen de paiement initial
            (Stripe / carte bancaire).
          </p>
        ),
      },
    ],
  },

  retractation: {
    title: 'Droit de rétractation',
    sections: [
      {
        heading: 'Délai légal',
        body: (
          <p>
            Conformément à la Directive européenne 2011/83/UE et à son
            transposition en droit national, vous disposez d'un délai de{' '}
            <strong>14 jours calendaires</strong> à compter de la réception de
            votre commande pour exercer votre droit de rétractation, sans avoir
            à justifier de motifs ni à payer de pénalités.
          </p>
        ),
      },
      {
        heading: 'Procédure',
        body: (
          <>
            <p>Pour exercer ce droit :</p>
            <ul>
              <li>
                Envoyez un e-mail à{' '}
                <a href="mailto:contact@burovia.fr">contact@burovia.fr</a> avec
                votre numéro de commande et la mention « Rétractation ».
              </li>
              <li>
                Vous pouvez également utiliser le formulaire type ci-dessous.
              </li>
              <li>
                Retournez l'article dans son état d'origine sous 14 jours après
                notification de votre rétractation.
              </li>
            </ul>
          </>
        ),
      },
      {
        heading: 'Formulaire type de rétractation',
        body: (
          <div className="legal-form-sample">
            <p>
              À l'attention de Gilles Ruszczycki — Burovia<br />
              17 rue de la Division Leclerc, 57280 Maizières-lès-Metz<br />
              contact@burovia.fr
            </p>
            <p>
              Je vous notifie par la présente de ma rétractation du contrat portant
              sur la commande n°&nbsp;<em>[votre numéro de commande]</em>, reçue
              le&nbsp;<em>[date de réception]</em>.
            </p>
            <p>
              Nom du consommateur : ___________________________<br />
              Adresse : ___________________________<br />
              Date : ___________________________<br />
              Signature (si formulaire papier) : ___________________________
            </p>
          </div>
        ),
      },
      {
        heading: 'Remboursement',
        body: (
          <p>
            Le remboursement interviendra dans un délai de{' '}
            <strong>14 jours</strong> à compter de la réception du retour
            ou de la preuve d'expédition. Le remboursement sera effectué via le
            moyen de paiement initial, sans frais supplémentaires.
          </p>
        ),
      },
      {
        heading: 'Exceptions',
        body: (
          <p>
            Le droit de rétractation ne s'applique pas aux produits
            personnalisés, aux articles descellés non retournables pour des
            raisons d'hygiène, ni aux biens nettement personnalisés.
          </p>
        ),
      },
    ],
  },

  contact: {
    title: 'Contact',
    sections: [
      {
        heading: 'Nous contacter',
        body: (
          <>
            <p>
              Pour toute question relative à une commande, un produit ou nos
              services, notre équipe est disponible par e-mail :
            </p>
            <p>
              <strong>
                <a href="mailto:contact@burovia.fr">contact@burovia.fr</a>
              </strong>
            </p>
            <p>
              Nous nous efforçons de répondre à toutes les demandes dans un délai
              de <strong>48 heures ouvrées</strong>.
            </p>
          </>
        ),
      },
      {
        heading: 'Suivi de commande',
        body: (
          <p>
            Après expédition, vous recevrez un e-mail avec votre numéro de suivi.
            Si vous n'avez reçu aucune nouvelle <strong>10 jours ouvrés</strong>{' '}
            après votre commande, contactez-nous en indiquant votre numéro de
            commande (visible sur votre confirmation de paiement Stripe).
          </p>
        ),
      },
      {
        heading: 'Retours et réclamations',
        body: (
          <p>
            Pour un retour ou une réclamation, mentionnez systématiquement votre
            numéro de commande et la nature du problème. Nous traitons chaque
            demande individuellement et cherchons à trouver une solution
            satisfaisante dans les meilleurs délais.
          </p>
        ),
      },
      {
        heading: 'Éditeur',
        body: (
          <p>
            Burovia est un projet de <strong>Gilles Ruszczycki</strong>,
            entrepreneur individuel.<br />
            SIRET : 989&nbsp;861&nbsp;869&nbsp;00018<br />
            17 rue de la Division Leclerc, 57280 Maizières-lès-Metz, France
          </p>
        ),
      },
    ],
  },
};

function LegalPage({ page, onBack }) {
  const current = CONTENT[page];

  if (!current) return null;

  return (
    <div className="legal-page">
      <div className="legal-card">
        <button className="legal-back-btn" onClick={onBack}>
          ← Retour à la boutique
        </button>

        <h1>{current.title}</h1>

        {current.sections.map((section) => (
          <section key={section.heading} className="legal-section">
            <h2>{section.heading}</h2>
            {section.body}
          </section>
        ))}
      </div>
    </div>
  );
}

export default LegalPage;
