\# 🐾 PawBox



> A modern pet-care commerce platform designed for the Kenyan market, combining physical pet food and supplies, subscriptions, personalized pet recommendations, veterinary guidance, and local delivery.



\---



\## 📌 Project Overview



PawBox is a pet-care commerce platform focused on making it easier for pet owners in Kenya to discover, purchase, and regularly receive pet food and essential pet supplies.



The platform is designed around a combination of:



\- 🛒 Physical pet products

\- 📦 Product catalog and inventory

\- 🔄 Subscription-based pet food delivery

\- 🐕 Pet profiles

\- 🩺 Veterinary recommendations

\- 📍 Local delivery

\- 💳 Kenya-friendly payment methods

\- 👤 Customer accounts

\- 📱 Mobile-first experience

\- 🔌 Backend API architecture



The long-term goal is to create a trusted pet-care ecosystem rather than simply another online pet store.



\---



\# 🎯 Product Vision



PawBox should make pet ownership easier by combining commerce and pet-care intelligence.



A customer should eventually be able to:



1\. Create an account.

2\. Add one or more pets.

3\. Record each pet's:

&#x20;  - Name

&#x20;  - Species

&#x20;  - Breed

&#x20;  - Age

&#x20;  - Weight

&#x20;  - Dietary preferences

&#x20;  - Allergies

&#x20;  - Activity level

4\. Receive personalized product recommendations.

5\. Purchase pet food and supplies.

6\. Subscribe to recurring food deliveries.

7\. Manage upcoming deliveries.

8\. Receive reminders when food is running low.

9\. Access veterinary-care recommendations.

10\. Track orders and deliveries.

11\. Manage payments and subscriptions.



\---



\# 🏗️ Architecture



PawBox is currently structured as a TypeScript monorepo managed with \*\*pnpm workspaces\*\*.



High-level architecture:



```text

&#x20;                        ┌─────────────────────┐

&#x20;                        │     PawBox User     │

&#x20;                        │   Mobile / Web App  │

&#x20;                        └──────────┬──────────┘

&#x20;                                   │

&#x20;                                   ▼

&#x20;                        ┌─────────────────────┐

&#x20;                        │   pawbox-mobile    │

&#x20;                        │ Expo / React Native │

&#x20;                        └──────────┬──────────┘

&#x20;                                   │

&#x20;                                   ▼

&#x20;                        ┌─────────────────────┐

&#x20;                        │     API Server      │

&#x20;                        │ Express + TypeScript│

&#x20;                        └──────────┬──────────┘

&#x20;                                   │

&#x20;                   ┌───────────────┼────────────────┐

&#x20;                   ▼               ▼                ▼

&#x20;                Database        Services       External APIs

&#x20;                   │                                │

&#x20;                   │                         ┌──────┴──────┐

&#x20;                   │                         │             │

&#x20;                   ▼                      Payments      Commerce

&#x20;                Drizzle                   Kenya         Shopify

&#x20;                ORM / DB

