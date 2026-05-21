package com.immoabidjan.config;

import com.immoabidjan.model.*;
import com.immoabidjan.repository.ArticleRepository;
import com.immoabidjan.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final PropertyRepository propertyRepository;
    private final ArticleRepository articleRepository;

    @Bean
    CommandLineRunner seed() {
        return args -> {
            if (propertyRepository.count() == 0) {
                seedProperties();
            }
            if (articleRepository.count() == 0) {
                seedArticles();
            }
        };
    }

    private void seedProperties() {
        propertyRepository.saveAll(List.of(

            createProperty("Villa 4 chambres – Quartier Nord",
                "Belle villa de standing avec jardin privatif, garage double et terrasse. Idéale pour une famille souhaitant un cadre calme et sécurisé.",
                PropertyType.VENTE, PropertyStatus.DISPONIBLE, Quartier.QUARTIER_1,
                220.0, new BigDecimal("85000000"), 4, 3,
                List.of("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80")),

            createProperty("Maison 3 chambres – Quartier Nord",
                "Maison moderne avec séjour lumineux, cuisine équipée et cour intérieure. Accès direct aux espaces verts du quartier.",
                PropertyType.VENTE, PropertyStatus.DISPONIBLE, Quartier.QUARTIER_1,
                160.0, new BigDecimal("62000000"), 3, 2,
                List.of("https://images.unsplash.com/photo-1599474462637-eeedfe72b12f?auto=format&fit=crop&w=800&q=80")),

            createProperty("Villa 5 chambres – Quartier Nord",
                "Grande villa familiale sur deux niveaux. Piscine, salon de réception, chambres avec salles de bain privées.",
                PropertyType.VENTE, PropertyStatus.RESERVE, Quartier.QUARTIER_1,
                310.0, new BigDecimal("120000000"), 5, 5,
                List.of("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80")),

            createProperty("Maison 3 chambres – Quartier Centre",
                "Résidence bien placée au cœur du domaine. Proche des commerces et des axes principaux. Finitions haut de gamme.",
                PropertyType.VENTE, PropertyStatus.DISPONIBLE, Quartier.QUARTIER_2,
                145.0, new BigDecimal("55000000"), 3, 2,
                List.of("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80")),

            createProperty("Maison 4 chambres – Quartier Centre",
                "Maison spacieuse avec grande véranda, parking couvert et système de sécurité intégré. Idéale pour les familles actives.",
                PropertyType.VENTE, PropertyStatus.DISPONIBLE, Quartier.QUARTIER_2,
                195.0, new BigDecimal("72000000"), 4, 3,
                List.of("https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80")),

            createProperty("Appartement T3 – Quartier Sud",
                "Appartement moderne avec balcon, cuisine ouverte et deux parkings. Quartier à fort potentiel locatif.",
                PropertyType.LOCATION, PropertyStatus.DISPONIBLE, Quartier.QUARTIER_3,
                95.0, new BigDecimal("450000"), 2, 1,
                List.of("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80")),

            createProperty("Appartement T2 – Quartier Sud",
                "Studio aménagé idéal pour étudiants ou jeunes actifs. Proche des universités et des transports.",
                PropertyType.LOCATION, PropertyStatus.DISPONIBLE, Quartier.QUARTIER_3,
                60.0, new BigDecimal("280000"), 1, 1,
                List.of("https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80")),

            createProperty("Maison 3 chambres – Quartier Sud",
                "Maison en location avec jardin, idéale pour investissement locatif. Rendement estimé à 7% par an.",
                PropertyType.LOCATION, PropertyStatus.DISPONIBLE, Quartier.QUARTIER_3,
                130.0, new BigDecimal("650000"), 3, 2,
                List.of("https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80")),

            createProperty("Villa 4 chambres – Quartier Centre",
                "Superbe villa avec piscine, salle de sport et terrasse panoramique. Quartier central et bien desservi.",
                PropertyType.VENTE, PropertyStatus.VENDU, Quartier.QUARTIER_2,
                250.0, new BigDecimal("98000000"), 4, 4,
                List.of("https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=800&q=80"))
        ));
    }

    private void seedArticles() {
        articleRepository.saveAll(List.of(

            createArticle("Pourquoi investir dans l'immobilier à Abidjan en 2025 ?",
                "Abidjan s'affirme comme l'une des places immobilières les plus dynamiques d'Afrique de l'Ouest...\n\nLe marché abidjanais connaît une croissance annuelle de 7 à 10 % portée par une démographie en plein essor, une classe moyenne en expansion et des infrastructures en amélioration constante.\n\nInvestir aujourd'hui, c'est profiter de prix encore accessibles avant la prochaine phase de valorisation.\n\nTrois raisons majeures d'y croire :\n- Une demande locative structurellement forte\n- Des titres fonciers sécurisés par l'État ivoirien\n- Un rendement locatif parmi les meilleurs du continent (6-8 % net)\n\nLe programme ImmoAbidjan s'inscrit dans cette dynamique avec 400 résidences modernes proposées à la vente et à la location.",
                "Abidjan s'affirme comme l'une des places immobilières les plus dynamiques d'Afrique de l'Ouest. Décryptage des opportunités à saisir.",
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
                "Équipe ImmoAbidjan",
                List.of("Investissement", "Marché", "Abidjan")),

            createArticle("Achat ou location : comment choisir à Abidjan ?",
                "Cette question revient souvent chez les acquéreurs et investisseurs qui s'intéressent au marché abidjanais.\n\nAcheter une résidence permet de constituer un patrimoine durable, de bénéficier d'une valorisation à long terme et d'échapper aux hausses de loyers.\n\nLouer, c'est conserver de la flexibilité, éviter l'immobilisation de capital et tester un quartier avant de s'y installer définitivement.\n\nNos conseils selon votre profil :\n\n**Vous habitez la diaspora ?**\nL'achat est souvent la meilleure option : vous sécurisez un bien que vous pouvez louer pendant votre absence et récupérer à votre retour.\n\n**Vous vous installez à Abidjan pour le travail ?**\nCommencez par louer pour découvrir les quartiers, puis envisagez l'achat une fois votre situation stabilisée.\n\n**Vous êtes investisseur ?**\nL'achat pour la mise en location offre des rendements attractifs, surtout dans le Quartier Sud du programme.",
                "Achat ou location à Abidjan : découvrez comment choisir en fonction de votre situation, vos objectifs et votre profil d'investisseur.",
                "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80",
                "Équipe ImmoAbidjan",
                List.of("Conseils", "Achat", "Location")),

            createArticle("Les 3 quartiers du domaine : lequel vous correspond ?",
                "Le programme ImmoAbidjan est organisé en trois quartiers résidentiels, chacun avec sa propre identité.\n\n**Quartier Nord – Le quartier famille**\nCalme, verdoyant et spacieux. Des villas de 3 à 5 chambres avec jardins et allées arborées. Idéal pour les familles cherchant un cadre de vie serein.\n\n**Quartier Centre – Le quartier connecté**\nAu cœur du domaine, proche des commerces et des axes principaux. Des maisons de 2 à 4 chambres avec accès rapide à tout le réseau abidjanais.\n\n**Quartier Sud – Le quartier investisseur**\nConçu pour le rendement locatif. Studios, T2 et T3 prisés des étudiants et jeunes actifs. Forte demande et taux d'occupation élevé.\n\nQuel que soit votre profil, un bien du programme correspond à vos besoins. Contactez-nous pour obtenir une sélection personnalisée.",
                "Découvrez les 3 quartiers résidentiels du domaine ImmoAbidjan et trouvez celui qui correspond à votre style de vie ou vos objectifs.",
                "https://images.unsplash.com/photo-1529528070131-eda9f3e90919?auto=format&fit=crop&w=900&q=80",
                "Équipe ImmoAbidjan",
                List.of("Quartiers", "Programme", "Guide")),

            createArticle("Comment financer son bien immobilier depuis la diaspora ?",
                "Acquérir un bien à Abidjan depuis l'étranger est désormais plus accessible qu'il n'y paraît.\n\nPlusieurs options s'offrent à vous :\n\n**1. L'apport personnel**\nLa solution la plus simple. Vous constituez une épargne dédiée et financez votre bien comptant ou avec un apport significatif.\n\n**2. Le crédit bancaire local**\nCertaines banques ivoiriennes proposent des prêts immobiliers aux non-résidents avec des taux entre 7 et 9 % sur 10 à 20 ans.\n\n**3. Le partenariat d'investissement**\nPlusieurs membres d'une famille ou d'un groupe co-achètent un bien pour le mettre en location et partager les revenus.\n\n**Notre accompagnement**\nL'équipe ImmoAbidjan vous guide dans toutes ces démarches, à distance et en transparence. Nous travaillons avec des partenaires bancaires et notariaux de confiance.",
                "Financer un bien immobilier à Abidjan depuis la France, le Canada ou ailleurs : nos conseils pour la diaspora africaine.",
                "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80",
                "Équipe ImmoAbidjan",
                List.of("Diaspora", "Financement", "Conseils"))
        ));
    }

    private Property createProperty(String titre, String description, PropertyType type,
                                     PropertyStatus status, Quartier quartier,
                                     Double superficie, BigDecimal prix,
                                     Integer chambres, Integer sallesDeBain, List<String> photos) {
        Property p = new Property();
        p.setTitre(titre);
        p.setDescription(description);
        p.setType(type);
        p.setStatus(status);
        p.setQuartier(quartier);
        p.setSuperficie(superficie);
        p.setPrix(prix);
        p.setNombreChambres(chambres);
        p.setNombreSallesDeBain(sallesDeBain);
        p.setPhotos(photos);
        return p;
    }

    private Article createArticle(String titre, String contenu, String resume,
                                   String imageUrl, String auteur, List<String> tags) {
        Article a = new Article();
        a.setTitre(titre);
        a.setContenu(contenu);
        a.setResume(resume);
        a.setImageUrl(imageUrl);
        a.setAuteur(auteur);
        a.setTags(tags);
        a.setPublie(true);
        a.setPublishedAt(LocalDateTime.now());
        return a;
    }
}
