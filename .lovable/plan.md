## Réseau Social RePère — v1 complète

Construction d'un vrai réseau social interne (façon Facebook) accessible via le service "Réseau social". Connexion obligatoire pour interagir, lecture publique du fil possible si non connecté (à confirmer ultérieurement).

### 1. Backend — Lovable Cloud

Activer Lovable Cloud (PostgreSQL + Auth + Storage + Realtime).

**Auth** : Email + mot de passe, Google, Apple. Page `/auth` (login/signup) + `/reset-password`.

**Tables (avec RLS sur toutes)** :
- `profiles` — id (FK auth.users), pseudo unique, display_name, avatar_url, bio, ville, profession, created_at. Trigger auto-création à l'inscription.
- `user_roles` — id, user_id, role (`admin`|`moderator`|`user`) — table séparée + fonction `has_role()` SECURITY DEFINER (anti-récursion RLS).
- `posts` — id, author_id, content (text), media_url, created_at, updated_at.
- `post_hashtags` — post_id, hashtag (extraction auto des #tag du contenu).
- `reactions` — id, post_id, user_id, type (`like`|`love`|`haha`|`wow`|`sad`|`angry`), unique(post_id, user_id).
- `comments` — id, post_id, author_id, content, parent_id (nullable, pour réponses), created_at.
- `follows` — follower_id, following_id (suivi entre users).
- `hashtag_follows` — user_id, hashtag (suivre un sujet).
- `groups` — id, name, slug, description, cover_url, created_by, is_public, created_at.
- `group_members` — group_id, user_id, role (`owner`|`admin`|`member`).
- `group_posts` — id, group_id, author_id, content, created_at.
- `conversations` — id, created_at (DM 1-to-1).
- `conversation_participants` — conversation_id, user_id (unique pair).
- `messages` — id, conversation_id, sender_id, content, created_at, read_at.
- `reports` — id, reporter_id, target_type (`post`|`comment`|`message`|`profile`), target_id, reason, status, created_at.

**Storage buckets** : `avatars` (public), `post-media` (public), `group-covers` (public).

**Realtime** : activé sur `messages`, `posts`, `comments`, `reactions` pour mises à jour live.

### 2. Routes frontend

Sous un layout `_authenticated` pour protéger le réseau :

- `/auth` — login/signup (public)
- `/reset-password` — public
- `/social` — fil d'actualité (feed des posts des gens suivis + tous publics si vide)
- `/social/explorer` — découvrir nouveaux users / hashtags trending
- `/social/post/$postId` — détail post + commentaires
- `/social/u/$pseudo` — profil public d'un membre
- `/social/me` — mon profil (édition)
- `/social/tag/$hashtag` — page d'un hashtag (#couple, #psg, #soirée…) avec posts + bouton suivre
- `/social/groupes` — liste des groupes
- `/social/groupes/$slug` — page d'un groupe (posts internes)
- `/social/messages` — liste des conversations
- `/social/messages/$conversationId` — chat 1-to-1 temps réel
- `/social/admin` — modération (signalements, suppressions) — gardé par `has_role('admin')`

Mise à jour de `/services/reseau-social` : page de présentation publique avec gros CTA "Entrer dans le réseau" → `/social` (login forcé).

### 3. Composants clés

- `<PostComposer/>` — textarea + upload média + détection live des #hashtags
- `<PostCard/>` — auteur, contenu, médias, barre réactions (6 emojis), commentaires inline, menu signaler
- `<CommentThread/>` — fil de commentaires avec réponses imbriquées (1 niveau)
- `<ReactionBar/>` — toggle réaction, hover pour choisir l'emoji
- `<HashtagChip/>` — clickable, navigue vers `/social/tag/$hashtag`
- `<UserMention/>` — avatar + pseudo, lien profil
- `<ChatWindow/>` — liste messages + input, scroll auto, realtime subscribe
- `<GroupCard/>`, `<TrendingTopics/>`, `<SuggestedUsers/>` — sidebar
- `<ReportDialog/>` — signalement contextuel
- `<AuthForm/>` — login + signup + Google + Apple + reset

### 4. Sécurité

- RLS stricte : un user voit/édite uniquement ses propres posts/commentaires/messages, mais lecture publique du fil et profils.
- Rôles via `user_roles` + `has_role()` (jamais sur `profiles`).
- Validation Zod sur tous les inputs (longueurs max, regex pseudo, sanitization).
- Modération : un admin peut supprimer n'importe quel contenu signalé.

### 5. Design

Conserve l'identité RePère (terre/rust, font display, grain) mais adapte pour densité d'info type feed social : cards plus compactes, sidebar gauche (nav) + centre (feed) + sidebar droite (trending) sur desktop, navigation bottom mobile.

### Découpage en lots (livrés en plusieurs messages)

**Lot 1 — Fondations** : Activation Cloud, schéma DB complet, RLS, triggers, page `/auth` (email + Google + Apple), `/reset-password`, layout `_authenticated/social`, mise à jour page `/services/reseau-social`.

**Lot 2 — Fil & posts** : `/social` (feed), composer, PostCard, réactions, commentaires, hashtags auto + page `/social/tag/$hashtag`, profils `/social/u/$pseudo` et `/social/me`.

**Lot 3 — Groupes & chat** : `/social/groupes` + `/social/groupes/$slug`, messagerie 1-to-1 temps réel `/social/messages`.

**Lot 4 — Modération & polish** : Signalements, panel admin `/social/admin`, explorer/trending, notifications basiques.

### Pour démarrer

J'ai besoin que tu confirmes l'activation de Lovable Cloud (PostgreSQL + auth managés). Pour Apple Sign-In, il faudra plus tard fournir le team ID et la clé Apple Developer (≈ 99 €/an Apple Developer Program) — on peut commencer avec Email + Google et ajouter Apple ensuite si tu n'as pas encore le compte.

Je lance le **Lot 1** dès ton OK.