# 💈 Barber App Next - Full Stack Booking Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](#)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat&logo=prisma&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql&logoColor=white)](#)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=flat&logo=vercel&logoColor=white)](#)

> **Projeto Full Stack de agendamento para barbearias**  
> Foco em arquitetura moderna, regras de negócio e experiência do usuário.

## 💡 O Projeto
O **Barber App Next** é uma aplicação web para agendamento de serviços em barbearias.  
O fluxo cobre desde autenticação do usuário até criação e gestão de reservas, simulando um cenário real de produto digital.

## ✨ Principais Funcionalidades
- **Login social com Google**
- **Busca de barbearias e serviços**
- **Agendamento por data e horário disponível**
- **Lista de reservas por status** (confirmados e finalizados)
- **Cancelamento de reserva**
- **Interface responsiva** para múltiplos dispositivos

## 🧠 Stack e Práticas
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Server Actions e renderização no servidor
- **Dados**: Prisma ORM + PostgreSQL
- **Auth**: NextAuth com Google Provider
- **Deploy**: Vercel

## 🚀 Aprendizados Técnicos
- Integração ponta a ponta entre UI, regras de negócio e banco
- Estruturação de componentes para escalar o código
- Tratamento de dados entre Server e Client Components no Next.js
- Ajustes de build/deploy em ambiente real (Vercel)

## 🛠️ Rodando localmente
```bash
git clone https://github.com/kaiquegg/barber-app-next
cd barber-app-next
npm install
```

Crie um arquivo `.env` com as variáveis:
```env
DATABASE_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
```
```bash
npx prisma migrate dev
npm run dev
```

## 🌐 Acesse o Projeto
**[https://barber-app-next.vercel.app](https://barber-app-next.vercel.app)**
