-- Deploy savoir:2.seeding to pg

BEGIN;

TRUNCATE "role", "picture", "user", "type", "condition", "ad", "label", "category", "belong", "get" RESTART IDENTITY;

INSERT INTO "role"(name) VALUES
('Admin'),
('User');

INSERT INTO "picture" (name, slug) VALUES 
('NULL', 'null'),
('BEARD1', 'beard-1'),
('BEARD2', 'beard-2'),
('BEARD3', 'beard-3'),
('HIJAB1', 'hijab-1'),
('HIJAB2', 'hijab-2'),
('HIJAB3', 'hijab-3'),
('LONG1', 'long-1'),
('LONG2', 'long-2'),
('LONG3', 'long-3'),
('nohair1', 'nohair-1'),
('NOHAIR2', 'nohair-2'),
('NOHAIR3', 'nohair-3'),
('RAD1', 'rad-1'),
('RAD2', 'rad-2'),
('RAD3', 'rad-3'),
('SHORT1', 'short-1'),
('SHORT2', 'short-2'),
('SHORT3', 'short-3');

INSERT INTO "user" (pseudo, email, password, birthdate, pronoun, firstname, lastname, postal_code, description, picture_id, role_id, created_at, updated_at) VALUES
('Ericou', 'ericou@mail.com', '123', '01/01/1900', 'pronoun', 'firstname', 'lastname', '01000', 'Une description : Lorem ipsum dolor sit amet. Ea necessitatibus adipisci qui vitae soluta est dignissimos distinctio animi voluptas. At temporibus harum ut iusto facilis ut inventore iste est culpa magni. In accusantium itaque est nihil galisum qui illo illo eum totam quod sed iure mollitia id corporis distinctio. Et veniam dignissimos cum animi ratione in nulla voluptatem?',
1, 1, now(), now()),
('Michou', 'micou@mail.com', '123', '01/01/1900', 'pronoun', 'firstname', 'lastname', '01000', 'Une description : Lorem ipsum dolor sit amet. Ea necessitatibus adipisci qui vitae soluta est dignissimos distinctio animi voluptas. At temporibus harum ut iusto facilis ut inventore iste est culpa magni. In accusantium itaque est nihil galisum qui illo illo eum totam quod sed iure mollitia id corporis distinctio. Et veniam dignissimos cum animi ratione in nulla voluptatem?',
10, 1, now(), now()),
('Mimi', 'mimi@mail.com', '123', '01/01/1900', 'pronoun', 'firstname', 'lastname', '01000', 'Une description : Lorem ipsum dolor sit amet. Ea necessitatibus adipisci qui vitae soluta est dignissimos distinctio animi voluptas. At temporibus harum ut iusto facilis ut inventore iste est culpa magni. In accusantium itaque est nihil galisum qui illo illo eum totam quod sed iure mollitia id corporis distinctio. Et veniam dignissimos cum animi ratione in nulla voluptatem?',
7, 1, now(), now()),
('Mati', 'mati@mail.com', '123', '01/01/1900', 'pronoun', 'firstname', 'lastname', '01000', 'Une description : Lorem ipsum dolor sit amet. Ea necessitatibus adipisci qui vitae soluta est dignissimos distinctio animi voluptas. At temporibus harum ut iusto facilis ut inventore iste est culpa magni. In accusantium itaque est nihil galisum qui illo illo eum totam quod sed iure mollitia id corporis distinctio. Et veniam dignissimos cum animi ratione in nulla voluptatem?',
5, 1, now(), now()),
('Titus', 'titus@mail.com', '123', '01/01/1900', 'pronoun', 'firstname', 'lastname', '01000', 'Une description : Lorem ipsum dolor sit amet. Ea necessitatibus adipisci qui vitae soluta est dignissimos distinctio animi voluptas. At temporibus harum ut iusto facilis ut inventore iste est culpa magni. In accusantium itaque est nihil galisum qui illo illo eum totam quod sed iure mollitia id corporis distinctio. Et veniam dignissimos cum animi ratione in nulla voluptatem?',
17, 1, now(), now());

INSERT INTO "type" (name) VALUES
('Recherche'),
('Propose');

INSERT INTO "condition" (name) VALUES
('Présentiel'),
('Distanciel');

INSERT INTO "category" (name, slug, created_at, updated_at) VALUES
('Administration', 'administration', now(), now()),
('Aide éducative', 'aide-educative', now(), now()),
('Animaux', 'animaux', now(), now()),
('Arts / travaux manuels', 'arts-travaux', now(), now()),
('Bien-être', 'bien-etre', now(), now()),
('Cuisine', 'cuisine', now(), now()),
('Découverte métier', 'decouverte-metier', now(), now()),
('Informatique', 'informatique', now(), now()),
('Jardin', 'jardin', now(), now()),
('Langues', 'langues', now(), now()),
('Partage culturel', 'partage-culturel', now(), now()),
('Réparation / bricolage', 'reparation-bricolage', now(), now()),
('Sport', 'sport', now(), now());

INSERT INTO "ad" (title, postal_code, image, description, user_id, condition_id, type_id, category_id, created_at, updated_at) VALUES
--RECHERCHE
('Initiation au théâtre d''impro, ou pas !)', '13000', 'arts-travaux', 'Bonjour, Très timide, je cherche un groupe de théâtre bienveillant pour apprendre à gérer mon angoisse de parler en public et gagner en assurance :) Je suis fasciné par le théâtre impro, alors un groupe de ce type serait un plus !)', 1, 1, 1, 4, now(), now()),

('Balade avec les toutous !', '33000', 'animaux', 'Bonjour bonjour ! Si ça en tente certains·es, nous pourrions promener nos loulous ensemble, le dimanche matin ! Je vous propose de nous retrouver dans le parc à chien du Jardin Public. Ensite, nous pourrions nous balader le long de la Garonne :)', 2, 1, 1, 3, now(), now()),

('Gimp', '34000', 'informatique', 'J''aimerais apprendre à me servir du logiciel Gimp. Je suis totalement débutant mais j''ai déjà installé le logiciel (je suis sur Ibook). J''aimerais organiser ça dans un café ou un bar, j''offre la première consommation ! Pour info, j''ai de bonnes notions Photoshop. Ca serait sympa de profiter du beau temps pour organiser ça :)', 3, 1, 1, 8, now(), now()),

('Si la Bourse n''a plus de secret pour vous…', '01000', 'administration', 'Bonjour ! Très intéressé par le milieu boursier, j''aimerais parfaire mes connaissances dans le domaine. Si j''ai quelques notions, du vocabulaire, etc, je peine encore à bien comprendre ses mécanismes et adorerait pouvoir bénéficier de vos lumières sur le sujet. Papoter avec une personne ayant bossé chez Euronex et pouvant me raconter les coulisses serait un rêve !', 4, 2, 1, 1, now(), now()),

('Langue des signes', '01000', 'langues', 'Bonjour. J''aimerais offrir un cadeau un peu spécial à ma tante pour Noël. Elle est malentendante et j''adorerais pouvoir apprendre les bases du langage des signes pour papoter avec elle le 25 décembre :) Pourriez-vous m''aider ? Je peux me déplacer sur Paris mais je préfèrerais en distanciel.', 5, 2, 1, 10, now(), now()),

('Visite guidée du Mont St Michel', '50170', 'partage-culturel', 'Bonjour ! je cherche un ou une guide pour visiter le Mont St Michel avec ma famille (enfants et adultes). Une personne habitant les lieux serait un plus. Nous aimerions être immergés dans l''histoire mais aussi la vie du lieu ! Nous sommes du coin alors on peut s''arranger sur la date. Le dimanche de préférence.', 5, 1, 1, 11, now(), now()),

('Cherche initiation à la méditation - enfant TSA', '75006', 'bien-etre', 'Je cherche une personne bienveillante acceptant d''initier mon fils de 13 ans à la méditation. Il a un TSA et est sujet à des crises. J''aimerais voir si cela pourrait l''aider à les gérer. A mon domicile de préférence pour lui permettre d''être dans un cadre rassurant.', 4, 1, 1, 5, now(), now()),

('Vélo à rénover', '33000', 'reparation-bricolage', 'Bonjour tout le monde. Je viens de récupérer un vieux vélo qui mériterait quelques réparations. Si quelqu''un pouvait me filer un coup de main ? J''adorerais le faire seul mais je n''y connais pas grand''chose. J''ai récupéré quelques outils et pièces détachées mais vu que je sais même pas si ça va me servir… j''aurais aussi besoin d''un brief là-dessus :D Merci !',
3, 1, 1, 12, now(), now()),

('Programmation de jeux vidéos', '62140', 'decouverte-metier', 'Bonjour ! J ai 13 ans et je dois faire un stage en entreprise de deux semaines. Passionnée de jeux vidéos, j adorerais pouvoir le faire auprès d un programmeur ou d une programmatrice dans le domaine. Je suis à la recherche de ce stage pour le mois de novembre et je peux me déplacer dans un rayon de 30km autour de Hesdin. le distanciel est aussi possible (merci le covid !).', 2, 1, 1, 7, now(), now()),

('Echecs en plein air', '69006', 'sport', 'Bonjour. Je cherche des partenaires au niveau confirmé pour jouer aux échecs au Parc de la Tête d Or. De préférence le week-end en début d apres midi. J amène le café ! Me contacter pour qu on se donne rendez-vous.', 1, 1, 1, 13, now(), now()),

('Nems \o/', '01000', 'cuisine', 'Bonjour. J adore les nems (surtout végés !) mais je ne sais absolument pas les cuisiner... et encore moins les rouler ! Est-ce qu une bonne âme saurait m apprendre ??', 2, 1, 1, 6, now(), now()),

('Soutien scolaire, physique/chimie', '17600', 'Aide-educative', 'Elève en classe de 5ème, la physique et la chimie me posent beaucoup de problème. Est-ce qu une personne pourrait m aider à me remettre à niveau ?', 3, 2, 1, 2, now(), now()),

--PORPOSE

('Amigurumi niveau avancé', '67202', 'arts-travaux', 'Bonjour ! Pratiquant le crochet depuis des lustres, je me suis spécialisée dans la confection d amigurumis. Si vous avez envie de progresser dans ce domaine, je me propose de partager avec vous mes techniques et astuces pour rendre vos créations toujours plus abouties ! Connaître les bases est impératif (au moins le cercle magique (magic ring), la maille serrée (single crochet) et la lecture de patrons).', 1, 1, 2, 4, now(), now()),

('Montage d''un PC', '37000', 'informatique', 'Bonjour ! jeune homme trans, je vous propose de vous apprendre à monter votre PC vous-même, chez moi, en petit groupe non mixte LGBTQIA+. Pour info, j''ai deux gros chiens et un jardin sécurisé. Si vous en avez, ils pourront s''éclater dehors pendant qu''on bosse :D Matériel de démo fourni. Contact pour plus d''infos.', 4, 1, 2, 8, now(), now()),

('Aide paperasse administrative (CAF, CMU…)', '13002', 'administration', 'Bonjour. Ancien employé de la CAF, je peux vous aider à remplir votre paperasse administrative. CME, CMU, demande d''allocation, etc. Ça pourrait être sympa de faire ça dans le secteur du Vieux Port :) Dispo de préférence en semaine, après 16h. Et pour info, je parle couramment arabe et me débrouille en anglais.', 5, 1, 2, 1, now(), now()),

('L''aquariophilie et les crevettes naines, ça vous parle ?', '69005', 'animaux', 'Aquariophile passionnée, je possède plusieurs aquariums d''eau douce, dont un de néocaridina blue velvet. Je vous propose de vous aider dans l''installation de votre aquarium spécifique crevettes, pour en faire un lieu de vie parfait pour ces petites bébêtes ! Nous pourrons en discuter au téléphone ou en visio dans un premier temps, puis je peux me déplacer chez vous (mobilité : transports en commun) pour l''installation concrète de l''aquarium. N''hésitez pas à me contacter !', 4, 1, 2, 3, now(), now()),

('Football pour amputés', '60000', 'sport', 'Entraîneur à la retraite, ancien médaillé des jeux paralympiques, je propose de vous faire découvrir le foot pour amputé (adultes et enfants) le week-end. Tenue de sport obligatoire. Le reste du matériel sera fourni. Plus d''infos : me contacter.', 2, 1, 2, 13, now(), now()),

('Soutien lecture écriture français', '44000', 'aide-educative', 'Professeure de français à la retraite, je souhaiterais aider les femmes adultes en grande précarité et/ou étrangères à acquérir des bases solides en écriture et lecture. La bibliothèque de Nantes dispose de salles que l''on peut privatiser pour travailler en petit groupe, gratuitement. horaires à définir ensemble. Je fournis le matériel nécessaire (crayon, cahier, livre…).', 3, 1, 2, 2, now(), now()),

('Pâtisseries marocaines', '35410', 'cuisine', 'Si vous avez envie de gourmandises, je peux vous apprendre la pâtisserie marocaine. Je vous accueille chez moi, en groupe, jusqu''à 5 personnes. Enfants bienvenus ! Nous pourrons partager nos petites douceurs autour d''un bon thé :) Contactez-moi si vous avez des questions.', 5, 1, 2, 6, now(), now()),

('Massage des mains à la pierre chaude', '25056', 'bien-etre', 'Bonjour ! Esthéticienne professionnelle, je vous propose de découvrir le massage des mains à la pierre chaude pour vous détendre après une dure journée de travail ! Je vous accueillerai dans mon salon entièrement accessible aux personnes en situation de handicap. Non-mixité : femmes. Chiens guides acceptés.', 1, 1, 2, 5, now(), now()),

('Petite plomberie', '17000', 'reparation-bricolage', 'Bonjour, bonsoir. Retraité bricoleur, je vous propose de petits travaux de plomberie chez vous. Je pourrais vous apprendre au passage les petites choses utiles qui vous éviteront d''avoir à faire appel à un plombier pour les réparations simples. Au plaisir de vous rencontrer.', 2, 1, 2, 12, now(), now()),

('Souffleur de verre', '63000', 'decouverte-metier', 'Bonjour. Maître verrier, ce serait avec plaisir que je vous ferai découvrir mon métier de souffleur de verre. Nous serons en petits groupes, à mon atelier. Les enfants sont les bienvenus, mais compte tenu de la chaleur et de la pratique très délicate du matériau, je préfère réserver cette découverte à partir de 13 ans.', 5, 1, 2, 7, now(), now()),

('Parlons de l''Ecosse !', '62100', 'partage-culturel', 'Edimbourgeois exilé en France depuis ma retraite, ça me manque souvent de pouvoir parler de mon beau pays ! Je vous propose d échanger à ce sujet, que vous souhaitiez découvrir ma culture ou échanger à propos de vos propres voyages dans les Highlands... Rencontrons-nous dans un petit bar du centre, accès PMR sans problème ! Adresse une fois la prise de contact faite.', 3, 1, 2, 11, now(), now()),

('Cours d Ukrainien pour débutants-es', '75006', 'langues', 'Bonsoir. Compte tenu du contexte actuel et par souci de solidarité pour les personnes accueillant des réfugiés, je propose de vous apprendre les bases de la langue ukrinienne. J ai vécu une dizaine d années là bas et suis parfaitement bilingue. Nous pourrions nous retrouver autour d un bon repas au Pirojki bar, dans le 9e. Attention, tolérance zéro pour les débats politiques sur le sujet :)', 1, 1, 2, 10, now(), now());


INSERT INTO "label" (name, slug, created_at, updated_at) VALUES
('Accessible PMR', 'accessible-PMR', now(), now()),
('Animal', 'animal', now(), now()),
('Ascenseur', 'ascenseur', now(), now()),
('Delete', 'delete', now(), now()),
('Enfant', 'enfant', now(), now()),
('Fumeur', 'fumeur', now(), now()),
('Github', 'github', now(), now()),
('Linkedin', 'linkedin', now(), now()),
('Location', 'location', now(), now()),
('Malentendant', 'malentendant', now(), now()),
('Malvoyant', 'malvoyant', now(), now()),
('Mixite', 'mixite', now(), now()),
('Outils', 'outils', now(), now()),
('Parking', 'parking', now(), now()),
('Personnes', 'personnes', now(), now()),
('Profil', 'profil', now(), now()),
('Rafraichissement', 'rafraichissement', now(), now());

INSERT INTO "belong" (condition_id, label_id, created_at) VALUES
(1, 1, now()),
(1, 2, now()),
(1, 3, now()),
(2, 1, now()),
(2, 4, now());

INSERT INTO "get" (ad_id, label_id, created_at) VALUES
(1, 1, now()),
(2, 2, now()),
(2, 3, now()),
(3, 3, now());

COMMIT;
