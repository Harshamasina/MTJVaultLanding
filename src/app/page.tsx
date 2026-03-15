import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
    return (
        <main id="main-content">
            <section className="min-h-screen flex items-center py-20">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-bold leading-tight tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                            Design Your Invention&apos;s{' '}
                            <span className="text-primary italic">Future</span>
                        </h1>
                        <p className="mt-6 text-xl leading-relaxed text-text-secondary max-w-2xl">
                            The modern IP management software for pharma companies
                            and law firms. Patent docketing, PCT/PRV/NPE case
                            management, and FDA 21 CFR Part 11 compliance — all in
                            one platform.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Button href="#get-started" size="lg">
                                Start Free Trial
                            </Button>
                            <Button
                                href="#demo"
                                variant="secondary"
                                size="lg"
                            >
                                Watch Demo
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
