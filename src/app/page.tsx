import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection, HERO_STATS, PRODUCT_STATS } from '@/components/sections/StatsSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ComplianceSection } from '@/components/sections/ComplianceSection';
import { SecuritySection } from '@/components/sections/SecuritySection';

export default function HomePage() {
    return (
        <main id="main-content">
            <HeroSection />
            <StatsSection stats={HERO_STATS} variant="cards" />
            <FeaturesSection />
            <ComplianceSection />
            <StatsSection stats={PRODUCT_STATS} variant="minimal" />
            <SecuritySection />
        </main>
    );
}
