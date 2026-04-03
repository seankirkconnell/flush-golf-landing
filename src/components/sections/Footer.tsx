import Image from "next/image";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-foreground py-10">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="FLUSH Golf"
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="font-[family-name:var(--font-heading)] font-semibold text-white text-sm">
              FLUSH <span className="font-normal text-white/50">Golf</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <a
              href="mailto:sean.kirkconnell@gmail.com"
              className="hover:text-white/70 transition-colors"
            >
              Contact
            </a>
            <span>•</span>
            <span>Built with AI pose estimation</span>
          </div>

          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} FLUSH Golf
          </p>
        </div>
      </Container>
    </footer>
  );
}
