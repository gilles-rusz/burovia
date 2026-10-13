export const EPISODES = [
  {
    slug: 'maladie-de-crohn',
    numero: 1,
    titre: "C'est quoi, la maladie de Crohn ?",
    resume: "Une maladie de l'intestin qui ne se voit pas, mais qui se vit. On démêle tout ça.",
    bulle: "Hé, regarde ! Je t'explique Crohn avec des mots simples, promis, sans jargon de toubib.",
    sections: [
      {
        titre: 'En deux mots',
        texte: [
          "La maladie de Crohn est une maladie inflammatoire chronique de l'intestin, on dit une MICI. Elle peut toucher tout le tube digestif, de la bouche jusqu'à l'anus, mais elle se loge le plus souvent au bout de l'intestin grêle (l'iléon) et dans le côlon.",
          "Elle avance par poussées : des périodes où ça flambe, puis des périodes calmes qu'on appelle rémissions. Et non, elle n'est pas contagieuse.",
        ],
      },
      {
        titre: "D'où ça vient ?",
        texte: [
          "On ne connaît pas encore la cause exacte. Les chercheurs pensent à un mélange de plusieurs choses : une part de génétique, un système immunitaire qui s'emballe contre l'intestin, et des facteurs de l'environnement. Le tabac, par exemple, est connu pour aggraver la maladie.",
          "Ce n'est pas la faute de ce que tu as mangé, ni du stress. Le stress peut compliquer le quotidien, mais il ne crée pas la maladie.",
        ],
      },
      {
        titre: 'Les signes qui reviennent souvent',
        liste: [
          'Des douleurs au ventre, souvent en bas à droite',
          'Des diarrhées qui durent',
          'Une grosse fatigue',
          'Une perte de poids ou d\'appétit',
          'Parfois de la fièvre ou des problèmes autour de l\'anus',
        ],
      },
      {
        titre: 'Comment on la découvre ?',
        texte: [
          "Le diagnostic se fait chez le gastro-entérologue, avec plusieurs examens : prise de sang, analyse des selles, coloscopie avec de petits prélèvements, et souvent une IRM de l'intestin.",
        ],
      },
      {
        titre: 'Et ça se soigne ?',
        texte: [
          "On ne sait pas encore la guérir, mais on sait la calmer. Selon les cas, le médecin propose des anti-inflammatoires, des immunosuppresseurs ou des biothérapies. Quand une partie de l'intestin est trop abîmée, la chirurgie peut être une solution, et parfois elle passe par une stomie.",
        ],
      },
    ],
  },
  {
    slug: 'les-formes-de-crohn',
    numero: 2,
    titre: 'Les différentes formes de Crohn',
    resume: "Pas un Crohn, mais des Crohn. Selon l'endroit touché et la façon dont il évolue.",
    bulle: "Chaque Crohn a son caractère. Le mien n'est pas forcément le tien, et c'est normal !",
    sections: [
      {
        titre: 'Selon l\'endroit touché',
        liste: [
          "Iléale : seulement la fin de l'intestin grêle",
          'Colique : seulement le côlon (le gros intestin)',
          'Iléo-colique : les deux à la fois, c\'est très fréquent',
          "Haute : l'estomac, l'œsophage ou le début de l'intestin, plus rare",
          "Avec atteinte anale : fissures, fistules ou abcès autour de l'anus",
        ],
      },
      {
        titre: 'Selon la façon dont il évolue',
        liste: [
          "Inflammatoire : l'intestin est irrité, sans autre dégât",
          "Sténosant : l'intestin se rétrécit à certains endroits",
          'Pénétrant ou fistulisant : l\'inflammation creuse des petits tunnels, les fistules',
        ],
      },
      {
        titre: 'Pourquoi c\'est utile de savoir ?',
        texte: [
          "Ces catégories aident les médecins à choisir le bon traitement et le bon suivi. Une forme peut aussi changer avec les années. Si tu ne sais pas laquelle est la tienne, demande à ton gastro, c'est ton droit de comprendre.",
        ],
      },
    ],
  },
  {
    slug: 'les-complications',
    numero: 3,
    titre: 'Les complications possibles',
    resume: 'Ce qui peut arriver en plus, pour le repérer tôt et en parler sans honte.',
    bulle: "On n'est pas là pour faire peur. Connaître les signes, c'est réagir plus vite !",
    sections: [
      {
        titre: 'Dans le ventre',
        liste: [
          "Sténose : l'intestin se rétrécit et peut se boucher (occlusion). Ventre gonflé, douleurs fortes, vomissements : on consulte vite.",
          'Fistules : des petits tunnels qui relient l\'intestin à un autre organe ou à la peau',
          'Abcès : une poche de pus, souvent avec fièvre et douleur',
          "Atteinte anale : fissures, fistules, abcès, à ne pas garder pour soi",
        ],
      },
      {
        titre: 'Dans le reste du corps',
        texte: [
          "Crohn ne reste pas toujours dans l'intestin. Il peut aussi se manifester ailleurs :",
        ],
        liste: [
          'Les articulations : douleurs, gonflements',
          'La peau : plaques ou nodules rouges et douloureux',
          'Les yeux : rougeur, douleur, gêne à la lumière',
          'Le foie et les voies biliaires, plus rarement',
        ],
      },
      {
        titre: 'Les carences et la fatigue',
        texte: [
          "Quand l'intestin absorbe mal, il peut manquer du fer, de la vitamine B12, de la vitamine D... Ça donne de l'anémie et une fatigue qui ne passe pas. Une simple prise de sang permet de vérifier.",
        ],
      },
      {
        titre: 'Sur le long terme',
        texte: [
          "Quand le côlon est touché depuis longtemps, le risque de cancer colorectal augmente un peu. C'est pour ça que les coloscopies de surveillance sont importantes.",
          "Et le moral compte aussi. Vivre avec une maladie chronique use parfois. En parler à un proche, à un psy ou ici, ce n'est pas une faiblesse.",
        ],
      },
    ],
  },
  {
    slug: 'la-stomie',
    numero: 4,
    titre: "C'est quoi, une stomie ?",
    resume: 'Le mot fait peur. La réalité est beaucoup plus simple, je te montre.',
    bulle: "Regarde, c'est elle ma stomie ! Elle m'a rendu la vie, alors on va en parler sans tabou.",
    sections: [
      {
        titre: 'Le principe',
        texte: [
          "Une stomie, c'est une ouverture faite par le chirurgien sur le ventre, pour que l'intestin (ou l'urine) sorte par là au lieu du chemin habituel. Le bout d'intestin visible sur la peau s'appelle aussi la stomie : il est rose ou rouge, humide, un peu comme l'intérieur de la bouche.",
          'Elle ne fait pas mal au toucher, car elle n\'a pas de nerfs de la douleur. Une poche collée sur la peau recueille les selles ou les urines.',
        ],
      },
      {
        titre: 'Les trois grandes familles',
        liste: [
          'Colostomie : faite sur le côlon, les selles sont souvent plus épaisses',
          "Iléostomie : faite sur l'intestin grêle, les selles sont plus liquides",
          'Urostomie : pour les urines',
        ],
      },
      {
        titre: 'Pour un temps ou pour toujours',
        texte: [
          "Une stomie peut être temporaire, pour laisser l'intestin se reposer et cicatriser, puis être refermée plus tard. Elle peut aussi être définitive. Elle peut venir d'une maladie de Crohn, d'une rectocolite, d'un cancer, d'une diverticulite ou d'un accident.",
        ],
      },
      {
        titre: 'Les poches',
        liste: [
          'Une pièce : la poche et le support collant ne font qu\'un',
          'Deux pièces : un support reste collé quelques jours, on change seulement la poche',
          'Fermée ou vidable, selon le type de stomie',
        ],
        texte: [
          "En France, le matériel est pris en charge sur prescription. Le ou la stomathérapeute, une infirmière ou un infirmier spécialisé, est ton meilleur allié pour trouver le bon appareillage.",
        ],
      },
    ],
  },
  {
    slug: 'vivre-avec',
    numero: 5,
    titre: 'Vivre avec une stomie au quotidien',
    resume: 'Bouger, manger, nager, voyager, aimer. Oui, tout ça reste possible.',
    bulle: "La vie continue, avec une cape en plus ! Voilà mes astuces de tous les jours.",
    sections: [
      {
        titre: 'Prendre soin de la peau',
        texte: [
          "La peau autour de la stomie doit rester saine. On découpe le support pile à la taille de la stomie, on nettoie à l'eau tiède, on sèche bien. Si ça rougit, que ça brûle ou que ça fuit souvent, on en parle au stomathérapeute.",
        ],
      },
      {
        titre: 'Manger et boire',
        texte: [
          "Après l'opération, on réintroduit les aliments petit à petit, en mâchant bien. Chacun découvre ce qui lui va ou pas. Avec une iléostomie, on perd plus d'eau : il faut boire régulièrement et surveiller les signes de déshydratation.",
        ],
      },
      {
        titre: 'Bouger, nager, voyager',
        liste: [
          'Le sport reste possible, en reprenant doucement après la chirurgie',
          'On évite de porter lourd au début, une ceinture de maintien peut aider',
          'La baignade, oui ! Les poches tiennent dans l\'eau',
          'En voyage : du matériel en double, dans le bagage cabine',
        ],
      },
      {
        titre: 'Le regard des autres, et le sien',
        texte: [
          "Le plus dur, souvent, c'est dans la tête. Se regarder dans le miroir, en parler à son conjoint, à ses enfants, au boulot. On a le droit d'avoir besoin de temps.",
          "C'est exactement pour ça que Les Capés du Bide existe : pour se dire qu'on n'est pas tout seul. Des associations comme l'AFA Crohn RCH France ou la Fédération des Stomisés de France peuvent aussi t'accompagner.",
        ],
      },
    ],
  },
];

export const findEpisode = (slug) => EPISODES.find((e) => e.slug === slug);
