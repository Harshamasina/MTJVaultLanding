import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';
import type { Role } from '@/types/careers';

interface RoleDetailApplyProps {
    role: Role;
}

export function RoleDetailApply({ role }: RoleDetailApplyProps) {
    const mailto = `mailto:${role.applyEmail}?subject=${encodeURIComponent(role.applySubject)}`;

    return (
        <section className="pb-20 lg:pb-28">
            <Container>
                <div className="max-w-3xl mx-auto rounded-2xl border border-card-border bg-page-bg-alt p-8 sm:p-10 text-center">
                    <h2
                        className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Ready to apply?
                    </h2>
                    <p
                        className="mt-3 text-[15px] text-text-secondary leading-relaxed max-w-xl mx-auto"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Send your CV, a short paragraph on the project you&rsquo;re proudest of, and a link to your work.
                    </p>
                    <div className="mt-7 flex flex-col items-center gap-5">
                        <Button href={mailto} variant="primary" size="lg">
                            Apply for {role.title}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Button>
                        <div className="flex flex-col items-center gap-2">
                            <p
                                className="text-xs text-text-muted"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                No mail client? Copy the address.
                            </p>
                            <CopyEmailButton email={role.applyEmail} />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
