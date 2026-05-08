import { Search, Workflow, Puzzle, GraduationCap, Code, Dumbbell, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { useEffect, useRef } from "react";

const toolLogos = [
  { name: "n8n", color: "#EA4B71", svg: '<svg viewBox="0 0 24 24"><path d="M12.76 1.64C14.346.054 16.893.054 18.48 1.64l3.878 3.879c1.586 1.586 1.586 4.133 0 5.72l-3.879 3.878c-1.586 1.586-4.133 1.586-5.72 0L8.883 11.24c-1.586-1.586-1.586-4.133 0-5.72zm-1.52 8.96l3.878 3.878c1.586 1.586 1.586 4.134 0 5.72l-3.879 3.879c-1.586 1.586-4.133 1.586-5.72 0L1.643 20.2c-1.586-1.587-1.586-4.134 0-5.72L5.52 10.6c1.586-1.586 4.133-1.586 5.72 0z"/></svg>' },
  { name: "Make", color: "#6D00CC", svg: '<svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 14.784c-.576 1.152-1.536 1.92-2.784 2.304-1.248.384-2.496.192-3.648-.384L7.2 18.72c-.192.096-.384.096-.576 0l-1.536-.768c-.192-.096-.288-.288-.288-.48V6.528c0-.192.096-.384.288-.48l1.536-.768c.192-.096.384-.096.576 0l3.936 2.016c1.152-.576 2.4-.768 3.648-.384 1.248.384 2.208 1.152 2.784 2.304.576 1.152.576 2.4 0 3.568z"/></svg>' },
  { name: "Zapier", color: "#FF4A00", svg: '<svg viewBox="0 0 24 24"><path d="M15.477 4.986l-3.014 3.014h-4.97L4.48 4.986l3.014-3.014h4.97l3.014 3.014zm4.538 4.537l-3.014 3.014v4.97l3.014 3.014 3.014-3.014v-4.97l-3.014-3.014zM4.986 8.523L1.972 11.537v4.97l3.014 3.014 3.014-3.014v-4.97L4.986 8.523zm10.49 10.49l-3.013 3.015h-4.97L4.48 19.014l3.014-3.014h4.97l3.014 3.014z"/></svg>' },
  { name: "Google Calendar", color: "#4285F4", svg: '<svg viewBox="0 0 24 24"><path d="M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H5.684v5.684h12.632zM5.684 18.316H0V5.684h5.684v12.632zM7.953 14.18l1.21-.933c.387.414.788.699 1.315.699.456 0 .748-.227.748-.559 0-.387-.3-.559-.808-.8l-.452-.195c-.828-.352-1.377-.794-1.377-1.728 0-.86.656-1.515 1.681-1.515.73 0 1.255.254 1.632.92l-1.178.907c-.23-.414-.48-.577-.798-.577-.363 0-.593.23-.593.577 0 .402.23.564.762.812l.452.195c.975.418 1.524.845 1.524 1.803 0 1.034-.812 1.6-1.903 1.6-1.066 0-1.756-.508-2.215-1.205zm5.873-.195V9.72h-1.15l.195-1.394h2.79v5.66h-1.835z"/></svg>' },
  { name: "Slack", color: "#4A154B", svg: '<svg viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>' },
  { name: "HubSpot", color: "#FF7A59", svg: '<svg viewBox="0 0 24 24"><path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.984v-.066a2.2 2.2 0 0 0-2.198-2.198h-.066a2.2 2.2 0 0 0-2.198 2.198v.066c0 .858.496 1.6 1.216 1.96v2.88a5.746 5.746 0 0 0-2.85 1.338L7.158 4.585a2.478 2.478 0 0 0 .078-.586A2.502 2.502 0 1 0 4.74 6.5c.54 0 1.035-.18 1.435-.48l6.12 4.628a5.74 5.74 0 0 0-.37 6.57l-1.88 1.88a2.08 2.08 0 0 0-.62-.1 2.094 2.094 0 1 0 2.094 2.094c0-.22-.036-.432-.1-.63l1.85-1.85a5.756 5.756 0 1 0 4.895-10.682z"/></svg>' },
  { name: "Shopify", color: "#7AB55C", svg: '<svg viewBox="0 0 24 24"><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104zm-1.461-17.166c0 0-.263.083-.681.208-.404-1.17-1.125-2.246-2.394-2.246h-.11c-.36-.465-.802-.67-1.186-.67-2.935 0-4.346 3.669-4.784 5.53-.678.21-1.159.358-1.219.379-.381.119-.393.131-.442.49-.037.27-1.029 7.928-1.029 7.928l7.743 1.455V10.813h.002zm-2.726-1.72c0 .06 0 .135-.005.209-.489.151-.994.31-1.54.476.298-1.14.856-1.694 1.349-1.907.125.324.196.734.196 1.222zm-.877-1.677c.088 0 .177.03.264.088-.637.3-1.318 1.058-1.606 2.571l-1.224.378c.34-1.156 1.157-3.037 2.566-3.037zm.303 7.258l-.468 1.442s-.52-.277-1.153-.277c-.932 0-.978.585-.978.732 0 .805 2.095 1.113 2.095 3.003 0 1.486-.94 2.442-2.21 2.442-1.523 0-2.302-.948-2.302-.948l.408-1.346s.8.687 1.474.687a.602.602 0 0 0 .624-.607c0-1.052-1.72-1.099-1.72-2.828 0-1.455 1.044-2.863 3.152-2.863.81 0 1.212.233 1.212.233l-.13.33z"/></svg>' },
  { name: "Airtable", color: "#18BFFF", svg: '<svg viewBox="0 0 24 24"><path d="M11.553.95L2.27 4.637a.55.55 0 0 0-.006 1.017l9.39 3.723a1.1 1.1 0 0 0 .81-.002l9.266-3.721a.55.55 0 0 0-.006-1.016L12.364.95a1.1 1.1 0 0 0-.811 0zm10.098 6.659l-8.678 3.478a.55.55 0 0 0-.345.51v9.27a.55.55 0 0 0 .757.508l8.678-3.586a.55.55 0 0 0 .337-.508V8.118a.55.55 0 0 0-.749-.509zM10.4 11.541L2.032 8.151a.55.55 0 0 0-.782.499v9.063a.55.55 0 0 0 .369.52l8.368 2.902a.55.55 0 0 0 .763-.507v-8.58a.55.55 0 0 0-.35-.507z"/></svg>' },
  { name: "Google Sheets", color: "#34A853", svg: '<svg viewBox="0 0 24 24"><path d="M11.318 12.545H7.91v-1.909h3.41v1.909zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.909h3.41v-1.909zM11.318 13.91H7.91v1.909h3.41v-1.909zM14.728 0H3.273A1.364 1.364 0 0 0 1.91 1.364v21.272A1.364 1.364 0 0 0 3.273 24h17.454A1.364 1.364 0 0 0 22.09 22.636V7.364h-7.364V0zM15.41 17.727H7.227V9.955h8.182v7.772z"/></svg>' },
  { name: "OpenAI", color: "#412991", svg: '<svg viewBox="0 0 24 24"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>' },
  { name: "Notion", color: "#000000", svg: '<svg viewBox="0 0 24 24"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.297 2.09c-.467-.373-.98-.746-2.054-.653L3.39 2.464c-.467.046-.56.28-.373.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.84c-.56.047-.747.327-.747.98zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.933-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.054-.047 3.082.7l4.249 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.046-1.448-.094-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.448-1.632z"/></svg>' },
  { name: "Stripe", color: "#635BFF", svg: '<svg viewBox="0 0 24 24"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.19l-.893 5.575C4.746 22.758 7.67 24 11.5 24c2.594 0 4.715-.635 6.236-1.886 1.638-1.34 2.506-3.32 2.506-5.603-.001-4.137-2.518-5.843-6.266-7.36z"/></svg>' },
  { name: "Twilio", color: "#F22F46", svg: '<svg viewBox="0 0 24 24"><path d="M12 0C5.381 0 0 5.381 0 12s5.381 12 12 12 12-5.381 12-12S18.619 0 12 0zm0 20.006c-4.418 0-8.006-3.588-8.006-8.006S7.582 3.994 12 3.994s8.006 3.588 8.006 8.006-3.588 8.006-8.006 8.006zm3.08-11.085a2.003 2.003 0 1 1-2.833-2.833 2.003 2.003 0 0 1 2.833 2.833zm0 5.912a2.003 2.003 0 1 1-2.833-2.833 2.003 2.003 0 0 1 2.833 2.833zm-5.912 0a2.003 2.003 0 1 1-2.833-2.833 2.003 2.003 0 0 1 2.833 2.833zm0-5.912a2.003 2.003 0 1 1-2.833-2.833 2.003 2.003 0 0 1 2.833 2.833z"/></svg>' },
  { name: "GitHub", color: "#181717", svg: '<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>' },
  { name: "Gmail", color: "#EA4335", svg: '<svg viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>' },
];

const services = [
  {
    icon: Search,
    title: "AI Audits",
    description: "We identify what's costing you time and money before writing a single line of code.",
  },
  {
    icon: Workflow,
    title: "Custom Workflows",
    description: "Tailored automation systems that eliminate repetitive work your team shouldn't be doing.",
  },
  {
    icon: Puzzle,
    title: "AI Integrations",
    description: "Connect your tools into one intelligent ecosystem that learns and adapts with your business.",
  },
  {
    icon: Code,
    title: "Development",
    description: "Custom AI-powered applications built for your specific business problems, not generic templates.",
  },
  {
    icon: Dumbbell,
    title: "Training",
    description: "Hands-on training so your team owns the AI systems we build. No vendor lock-in.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Empower your people with AI knowledge and best practices for lasting transformation.",
  },
];

const ToolsStrip = ({ isVisible }: { isVisible: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let pos = 0;
    const speed = 0.4;

    const animate = () => {
      pos += speed;
      if (pos >= container.scrollWidth / 2) pos = 0;
      container.scrollLeft = pos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const allLogos = [...toolLogos, ...toolLogos];

  return (
    <div
      className="mb-16 overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
      }}
    >
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div
          ref={scrollRef}
          className="flex items-center gap-8 overflow-x-hidden py-4"
          style={{ scrollBehavior: "auto" }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              dangerouslySetInnerHTML={{ __html: logo.svg.replace('<svg ', `<svg fill="${logo.color}" `) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: saasRef, isVisible: saasVisible } = useScrollReveal();

  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden section-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Editorial header — matches site pattern */}
          <div ref={headerRef} className="mb-12 max-w-4xl">
            <span
              className="text-mono text-primary/70 block mb-6"
              style={staggerStyle(0, headerVisible)}
            >
              Services
            </span>
            <h2 className="text-heading" style={staggerStyle(1, headerVisible)}>
              Your trusted partner<br />
              <span className="text-gradient">for AI transformation.</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
          </div>

          {/* Editorial index — vertical list of services */}
          <div ref={gridRef} className="mt-16 sm:mt-20 border-t border-border/60">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="group relative border-b border-border/60 overflow-hidden"
                style={staggerStyle(i, gridVisible, { delay: 0.08 })}
              >
                {/* Sweep fill on hover */}
                <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent transition-transform duration-700 ease-out" />

                <div className="relative grid grid-cols-12 items-center gap-4 sm:gap-6 py-7 sm:py-9 px-1 sm:px-2">
                  {/* Number */}
                  <span className="col-span-2 sm:col-span-1 text-mono text-xs text-foreground/40 group-hover:text-primary transition-colors duration-500">
                    0{i + 1}
                  </span>

                  {/* Title */}
                  <h3 className="col-span-10 sm:col-span-4 font-display text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {service.title}
                  </h3>

                  {/* Description — fades in on hover (desktop), always visible on mobile */}
                  <p className="col-span-12 sm:col-span-6 text-sm text-muted-foreground leading-relaxed sm:opacity-60 sm:group-hover:opacity-100 transition-opacity duration-500">
                    {service.description}
                  </p>

                  {/* Icon */}
                  <div className="hidden sm:flex sm:col-span-1 justify-end">
                    <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                      <service.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom SaaS — featured block */}
          <div
            ref={saasRef}
            className="group relative mt-16 sm:mt-20 border border-border/60 overflow-hidden bg-background"
            style={staggerStyle(0, saasVisible, { distance: 20 })}
          >
            <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent transition-transform duration-700 ease-out" />
            <span className="pointer-events-none absolute top-0 left-0 h-px bg-primary w-0 group-hover:w-full transition-[width] duration-700 ease-out" />

            <div className="relative p-8 md:p-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-mono text-xs text-primary">Featured</span>
                  <span className="h-px w-10 bg-primary/50" />
                </div>
                <div className="mb-6 inline-flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
                  <Layers className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 tracking-tight">
                  Custom SaaS Development
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  From concept to launch. We design, build, and deploy scalable SaaS platforms tailored to your market and growth goals.
                </p>
              </div>
              <Button asChild size="lg" className="gap-2 rounded-none uppercase text-xs tracking-wider px-6 py-5 self-start lg:self-end shrink-0 group/btn">
                <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                  Let's talk
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>


          {/* Tools strip — reframed */}
          <div className="mt-20 md:mt-24 text-center">
            <p className="text-mono text-foreground/50 mb-10">
              Built on the tools your team already uses
            </p>
            <ToolsStrip isVisible={headerVisible} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

