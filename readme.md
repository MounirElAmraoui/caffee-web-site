# ☕ L'Artisan Café

| Aspect | Détail |
|--------|--------|
| **Type** | Application web café premium (HTML/CSS/JS) |
| **Design** | Glassmorphism, or/noir, responsive |
| **Stockage** | LocalStorage (produits, panier, favoris, commandes) |

## Fonctionnalités

| Module | Capacités |
|--------|-----------|
| **Client** | Menu filtrable, panier, favoris, réservation table |
| **Admin** | Dashboard stats, gestion stock, commandes, export CSV |

## Structure

| Fichier | Rôle |
|---------|------|
| `index.html` | Interface monopage |
| `index.css` | Styles + animations |
| `index.js` | Logique métier |

## Accès Admin

| Paramètre | Valeur |
|-----------|--------|
| Bouton | "Pro" (header) |
| Mot de passe | `mounir123` |

## Données

| Clé LocalStorage | Contenu |
|------------------|---------|
| `lux-products-v2` | Catalogue 9 produits |
| `lux-cart` | Panier client |
| `lux-sales-v2` | Historique commandes |
| `lux-reservations` | Réservations tables |

## Lancement

| Étape | Action |
|-------|--------|
| 1 | Ouvrir `index.html` dans navigateur |
| 2 | Modifier `CONFIG` dans JS pour personnaliser |