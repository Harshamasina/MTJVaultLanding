import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <main id="main-content">
            <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
                <Container>
                    <div className="text-center max-w-lg mx-auto">
                        <p
                            className="text-7xl font-bold text-primary lg:text-9xl"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            404
                        </p>
                        <h1
                            className="mt-6 text-2xl font-bold text-text-primary sm:text-3xl"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Page Not Found
                        </h1>
                        <p
                            className="mt-4 text-base text-text-secondary leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            The page you&apos;re looking for doesn&apos;t exist
                            or has been moved. Let&apos;s get you back on track.
                        </p>
                        <div className="mt-8">
                            <Button href="/" size="lg">
                                <ArrowLeft className="w-5 h-5" />
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
