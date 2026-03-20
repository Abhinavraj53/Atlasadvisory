'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  Compass,
  Globe2,
  Landmark,
  LineChart,
  MoveRight,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

const advisoryServices = [
  {
    title: 'Strategic Advisory',
    description: 'Growth choices, portfolio direction, and business-model clarity for companies at inflection points.',
    icon: Compass,
    accent: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    title: 'Commercial Due Diligence',
    description: 'Market, partner, and opportunity reviews to support large decisions with sharper commercial judgment.',
    icon: Landmark,
    accent: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    title: 'Performance Improvement',
    description: 'Operating rhythm, cost visibility, and execution planning for businesses that need disciplined momentum.',
    icon: LineChart,
    accent: 'from-amber-500/20 to-amber-500/5',
  },
  {
    title: 'Leadership Counsel',
    description: 'Hands-on advisory support for founders, promoters, and leadership teams managing change.',
    icon: Users,
    accent: 'from-fuchsia-500/20 to-fuchsia-500/5',
  },
];

const impactStats = [
  { value: '120+', label: 'Strategic Reviews' },
  { value: '40+', label: 'Growth Mandates' },
  { value: '12', label: 'Core Sectors' },
  { value: '24/7', label: 'Decision Support' },
];

const heroImage = 'https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg';

const engagementFlow = [
  {
    step: '01',
    title: 'Diagnose',
    text: 'We map the commercial question, decision risk, and real-world constraints behind the mandate.',
    icon: Target,
  },
  {
    step: '02',
    title: 'Analyze',
    text: 'We pressure-test assumptions, market signals, operating data, and execution realities.',
    icon: BarChart3,
  },
  {
    step: '03',
    title: 'Advise',
    text: 'We convert insight into a practical recommendation with clear priorities and tradeoffs.',
    icon: ShieldCheck,
  },
  {
    step: '04',
    title: 'Execute',
    text: 'We stay close to implementation so the strategy survives contact with the business.',
    icon: TrendingUp,
  },
];

const mandateCards = [
  {
    title: 'Expansion Readiness',
    text: 'Commercial and operating readiness reviews before entering new markets or categories.',
    image: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg)',
  },
  {
    title: 'Investor & Promoter Support',
    text: 'Decision packs that align leadership teams, capital plans, and execution priorities.',
    image: 'url(https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg)',
  },
  {
    title: 'Asset & Sector Intelligence',
    text: 'Structured views on sector shifts, distressed opportunities, and strategic fit.',
    image: 'url(https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg)',
  },
];

const insightChips = [
  'Industrial Businesses',
  'Trading & Distribution',
  'Family-Led Enterprises',
  'Circular Economy',
  'Asset-Heavy Operations',
  'Growth-Stage Ventures',
  'Turnaround Situations',
  'Strategic Partnerships',
];

const faqItems = [
  {
    question: 'What kind of clients does Atlas Advisory typically work with?',
    answer:
      'We typically support founders, family-led businesses, operators, investors, and leadership teams who need clarity around growth, restructuring, market positioning, or strategic execution.',
  },
  {
    question: 'Do you only advise scrap and industrial businesses?',
    answer:
      'No. Scrap and industrial mandates are an important part of the broader Atlas ecosystem, but the advisory practice also supports trading businesses, growth-stage ventures, asset-led opportunities, and complex commercial decision-making.',
  },
  {
    question: 'How does an engagement usually begin?',
    answer:
      'Most mandates start with a discovery conversation where we define the business question, decision urgency, data available, and the expected output. From there we shape a focused engagement plan.',
  },
  {
    question: 'Can Atlas Advisory help with execution after strategy?',
    answer:
      'Yes. We do not stop at high-level recommendations. We can stay involved through prioritization, operating alignment, action planning, and implementation support where needed.',
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ['start end', 'end start'],
  });

  const heroBackgroundY = useTransform(heroProgress, [0, 1], ['0%', '18%']);
  const heroCardY = useTransform(heroProgress, [0, 1], ['0%', '-14%']);
  const storyImageY = useTransform(storyProgress, [0, 1], ['10%', '-10%']);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="overflow-hidden pt-20">
        <section ref={heroRef} className="relative min-h-[125vh] overflow-hidden bg-[#08110f] text-white">
          <motion.div className="absolute inset-0" style={{ y: heroBackgroundY }}>
            <div
              className="absolute inset-0 bg-cover opacity-28"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundPosition: 'center 26%',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(35,211,167,0.22),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(84,166,255,0.18),transparent_24%),radial-gradient(circle_at_70%_78%,rgba(229,178,84,0.16),transparent_22%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,9,0.95),rgba(9,28,23,0.80),rgba(7,14,19,0.92))]" />
          </motion.div>

          <div className="absolute left-[5%] top-24 h-48 w-48 rounded-full bg-emerald-400/12 blur-3xl" />
          <div className="absolute right-[6%] top-44 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-16 left-[32%] h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

          <div className="container relative z-10 mx-auto px-4 pb-24 pt-12 md:pb-32 md:pt-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.72fr)] lg:items-end xl:grid-cols-[minmax(0,1.38fr)_minmax(340px,0.62fr)]">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-none lg:pr-4 xl:pr-8"
              >
                <Badge className="mb-6 border border-white/15 bg-white/10 px-5 py-2 text-white backdrop-blur-md hover:bg-white/10">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  Atlas Advisory • Strategic Consulting
                </Badge>

                <h1 className="max-w-none text-5xl font-bold leading-[0.96] tracking-tight md:text-7xl xl:text-[5.5rem]">
                  Clarity for Complex Business Decisions.
                  <span className="mt-2 block bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                    Strategy that actually moves.
                  </span>
                </h1>

                <p className="mt-7 max-w-3xl text-lg leading-8 text-white/73 md:text-xl">
                  Atlas Advisory combines strategy, commercial intelligence, and execution support for leaders who
                  need practical answers, not presentation-heavy advice.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="gap-2 bg-primary px-8 py-6 text-base shadow-[0_18px_35px_rgba(16,185,129,0.22)] hover:bg-primary/90">
                      Start an Advisory Discussion
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/scrap-business">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 bg-white/5 px-8 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                    >
                      Explore Scrap Business
                    </Button>
                  </Link>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {impactStats.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 * index + 0.2 }}
                      whileHover={{ y: -6 }}
                      className="rounded-3xl border border-white/10 bg-white/8 px-4 py-5 backdrop-blur-sm transition-shadow hover:shadow-[0_22px_40px_rgba(0,0,0,0.18)]"
                    >
                      <div className="text-2xl font-bold text-white">{item.value}</div>
                      <div className="mt-1 text-sm text-white/60">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{ y: heroCardY }}
                className="relative flex justify-start lg:justify-end lg:pl-2"
              >
                <div className="w-full max-w-[24rem] rounded-[2rem] border border-white/12 bg-white/8 p-6 text-white shadow-[0_28px_60px_rgba(0,0,0,0.28)] backdrop-blur-md xl:max-w-[25rem]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/10">
                      <Briefcase className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/45">Live Mandate Model</p>
                      <p className="mt-1 text-lg font-medium text-white">Growth, diligence, turnaround</p>
                    </div>
                  </div>
                  <p className="mt-5 max-w-[28ch] text-sm leading-7 text-white/68">
                    Advisory support built around commercial decisions, execution pressure points, and leadership alignment.
                  </p>

                  <div className="mt-6 space-y-3">
                    {['Commercial rigor + implementation realism', 'Boardroom-to-operator visibility', 'Decision support that can be executed'].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/22 px-4 py-3 text-sm text-white/78"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18 }}
              style={{ y: heroCardY }}
              className="mt-14"
            >
              <Card className="overflow-hidden border border-white/12 bg-white/10 text-white shadow-[0_35px_90px_rgba(0,0,0,0.32)] backdrop-blur-md">
                <CardContent className="p-0">
                  <div className="relative min-h-[620px] overflow-hidden lg:min-h-[680px]">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.8 }}
                      style={{
                        backgroundImage: `url(${heroImage})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,11,10,0.88)] via-[rgba(6,11,10,0.42)] to-[rgba(6,11,10,0.18)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,9,9,0.92)] via-transparent to-[rgba(5,9,9,0.12)]" />

                    <div className="relative flex min-h-[620px] flex-col justify-between p-6 md:p-8 lg:min-h-[680px] lg:p-10">
                      <div className="flex flex-wrap gap-3">
                        <div className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm">
                          Boardroom to Execution Floor
                        </div>
                        <div className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm">
                          Operating Lens
                        </div>
                      </div>

                      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
                        <div className="max-w-[640px] rounded-[2rem] border border-white/10 bg-black/38 p-6 shadow-[0_22px_40px_rgba(0,0,0,0.18)] backdrop-blur-md md:p-7">
                          <p className="text-xs uppercase tracking-[0.28em] text-white/52">Atlas Advisory Model</p>
                          <h2 className="mt-3 max-w-[12ch] text-4xl font-semibold leading-[1.02] md:text-[3.3rem]">
                            Insight, pressure-testing, and confident commercial direction.
                          </h2>
                          <p className="mt-4 max-w-[48ch] text-sm leading-7 text-white/68 md:text-base">
                            Commercial rigor paired with implementation realism for decisions that need to hold up in leadership reviews and daily operating reality.
                          </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          {[
                            'Commercial signals',
                            'Decision frameworks',
                            'Operator-focused plans',
                            'Leadership alignment',
                          ].map((item) => (
                            <motion.div
                              key={item}
                              whileHover={{ y: -4, scale: 1.01 }}
                              className="rounded-[1.6rem] border border-white/12 bg-black/42 p-5 backdrop-blur-sm transition-colors hover:bg-black/52"
                            >
                              <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-300" />
                              <div className="text-base font-medium text-white/88">{item}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-border bg-card/40 py-6">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-sm uppercase tracking-[0.28em] text-muted-foreground">
            <span>Strategy</span>
            <span>Commercial Intelligence</span>
            <span>Leadership Support</span>
            <span>Execution Planning</span>
            <span>Growth Advisory</span>
          </div>
        </section>

        <section className="bg-muted/20 py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 text-center"
            >
              <Badge className="mb-4 px-5 py-2">
                <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                Core Capabilities
              </Badge>
              <h2 className="text-4xl font-bold md:text-6xl">More Components. More Depth. More Motion.</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
                The homepage now layers service cards, hoverable content blocks, scroll-based transitions, and
                parallax imagery so the experience feels more premium as you move through it.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {advisoryServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="group h-full overflow-hidden border-2 transition-all hover:border-primary/35 hover:shadow-2xl">
                    <CardContent className="p-0">
                      <div className={`h-full bg-gradient-to-b ${service.accent} p-6`}>
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                          <service.icon className="h-7 w-7" />
                        </div>
                        <h3 className="mb-3 text-2xl font-semibold">{service.title}</h3>
                        <p className="leading-7 text-muted-foreground">{service.description}</p>
                        <div className="mt-8 flex items-center gap-2 font-medium text-primary transition-all group-hover:gap-4">
                          Learn More
                          <MoveRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={storyRef} className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4 px-5 py-2">
                  <Building2 className="mr-2 h-3.5 w-3.5" />
                  Advisory Focus
                </Badge>
                <h2 className="mb-5 text-4xl font-bold md:text-5xl">A Scroll Journey That Moves Like a Consulting Narrative</h2>
                <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                  We split the page into story-led modules so users move from clarity, to capability, to proof,
                  to action. Each section now contributes something different instead of repeating the same card layout.
                </p>

                <div className="mt-10 grid gap-4">
                  {[
                    'Parallax hero and image panels for depth',
                    'Hover-responsive cards with animated icons',
                    'Expanded scrollable sections for service storytelling',
                    'Clear pathways into dashboard, marketplace, and scrap verticals',
                  ].map((item) => (
                    <div key={item} className="rounded-3xl border border-border bg-card px-5 py-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <p className="leading-7 text-muted-foreground">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid gap-5 sm:grid-cols-2">
                <motion.div
                  style={{ y: storyImageY }}
                  whileHover={{ y: -10 }}
                  className="relative h-[360px] overflow-hidden rounded-[2rem] border border-border shadow-xl"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: 'url(https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/60">Commercial Thinking</p>
                    <h3 className="mt-3 text-2xl font-semibold">Structured insight before big moves</h3>
                  </div>
                </motion.div>

                <div className="grid gap-5">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative h-[170px] overflow-hidden rounded-[2rem] border border-border shadow-xl"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{
                        backgroundImage: 'url(https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg)',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-xl font-semibold">Leadership alignment</h3>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -8 }}
                    className="rounded-[2rem] border border-border bg-stone-950 p-6 text-white shadow-xl"
                  >
                    <Globe2 className="mb-4 h-8 w-8 text-emerald-300" />
                    <h3 className="text-2xl font-semibold">Sector-led perspective</h3>
                    <p className="mt-3 leading-7 text-white/68">
                      Coverage across industrials, trading, circular economy, assets, and growth-stage mandates.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {insightChips.slice(0, 4).map((chip) => (
                        <span key={chip} className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/70">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-stone-950 py-24 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 text-center"
            >
              <Badge className="mb-4 border border-white/10 bg-white/10 px-5 py-2 text-white hover:bg-white/10">
                <Target className="mr-2 h-3.5 w-3.5" />
                Engagement Model
              </Badge>
              <h2 className="text-4xl font-bold md:text-6xl">How We Work With Clients</h2>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {engagementFlow.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full border border-white/10 bg-white/5 text-white backdrop-blur-sm transition-all hover:border-emerald-300/30 hover:bg-white/10">
                    <CardContent className="p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <span className="text-5xl font-bold text-white/12">{item.step}</span>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/12 text-emerald-300">
                          <item.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <h3 className="mb-3 text-2xl font-semibold">{item.title}</h3>
                      <p className="leading-7 text-white/66">{item.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/20 py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div className="max-w-2xl">
                <Badge className="mb-4 px-5 py-2">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  Featured Components
                </Badge>
                <h2 className="text-4xl font-bold md:text-5xl">Additional Scroll Sections for a Stronger Homepage</h2>
              </div>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                These cards add proof, variety, and movement so the homepage now supports longer browsing without feeling flat.
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {mandateCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="group h-full overflow-hidden border-2 transition-all hover:border-primary/35 hover:shadow-2xl">
                    <CardContent className="p-0">
                      <div className="relative h-[340px] overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: card.image }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-2xl font-semibold">{card.title}</h3>
                          <p className="mt-3 leading-7 text-white/72">{card.text}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 flex flex-wrap justify-center gap-3">
              {insightChips.map((chip) => (
                <motion.div key={chip} whileHover={{ y: -4 }}>
                  <Badge variant="secondary" className="rounded-full px-4 py-2 text-sm">
                    {chip}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(135deg,#0a1814,#10221d,#153029)] px-8 py-14 text-white shadow-[0_35px_90px_rgba(4,12,10,0.18)] md:px-14"
            >
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <Badge className="mb-5 border border-white/10 bg-white/10 px-5 py-2 text-white hover:bg-white/10">
                    Atlas Advisory
                  </Badge>
                  <h2 className="max-w-3xl text-4xl font-bold md:text-6xl">Need Advisory on One Side and Scrap Capability on the Other?</h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                    Atlas Advisory now has a longer, more interactive consultancy homepage, while the scrap business
                    experience remains available as its own dedicated destination.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/scrap-business">
                    <motion.div whileHover={{ y: -6, scale: 1.01 }}>
                      <Card className="h-full border border-white/10 bg-white/6 text-white">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-semibold">Scrap Vertical</h3>
                          <p className="mt-3 leading-7 text-white/66">
                            Access the existing scrap business landing page, marketplace paths, and industrial flow.
                          </p>
                          <div className="mt-6 flex items-center gap-2 font-medium text-emerald-300">
                            Open Scrap
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>

                  <Link href="/marketplace">
                    <motion.div whileHover={{ y: -6, scale: 1.01 }}>
                      <Card className="h-full border border-white/10 bg-white/6 text-white">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-semibold">Marketplace</h3>
                          <p className="mt-3 leading-7 text-white/66">
                            Move directly into listings, import requirements, and deal discovery.
                          </p>
                          <div className="mt-6 flex items-center gap-2 font-medium text-emerald-300">
                            Visit Marketplace
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:sticky lg:top-28"
              >
                <Badge className="mb-4 px-5 py-2">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  FAQs
                </Badge>
                <h2 className="text-4xl font-bold md:text-5xl">Frequently Asked Questions</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                  A few quick answers about how Atlas Advisory works, who we work with, and how mandates usually begin.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={item.question}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                      whileHover={{ y: -4 }}
                    >
                      <AccordionItem
                        value={`faq-${index}`}
                        className="overflow-hidden rounded-[1.75rem] border border-border bg-card px-6 shadow-sm transition-all hover:border-primary/35 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                      >
                        <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-base leading-8 text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
