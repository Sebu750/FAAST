// Image resolver for database-stored asset paths
// Maps /src/assets/ paths to properly bundled assets for production

// Import all assets that can be referenced from the database
import heroRunway from '../assets/hero-runway.webp'
import homeDesignerPortrait3 from '../assets/home-designer-portrait-3.webp'
import homeDesignerPortrait1 from '../assets/home-designer-portrait-1.webp'
import homeDesignerPortrait2 from '../assets/home-designer-portrait-2.webp'
import hero1 from '../assets/hero1.webp'
import runway from '../assets/runway.webp'
import fashion from '../assets/fashion.webp'
import brand1 from '../assets/brand1.webp'
import brand2 from '../assets/brand2.webp'
import brand3 from '../assets/brand3.webp'
import brand4 from '../assets/brand4.webp'
import brand5 from '../assets/brand5.webp'
import studio from '../assets/studio.webp'
import studio1 from '../assets/studio1.webp'
import craft from '../assets/craft.webp'
import spotlight from '../assets/spotlight.webp'
import heroHome from '../assets/hero-home.webp'
import homeLuxuryBridal from '../assets/home-luxury-bridal.webp'
import homeHeritageCraft from '../assets/home-heritage-craft.webp'
import homeSustainableFashion from '../assets/home-sustainable-fashion.webp'
import homeFabricInnovation from '../assets/home-fabric-innovation.webp'
import homeHeroCraft from '../assets/home-hero-craft.webp'
import homeHeroRunway from '../assets/home-hero-runway.webp'
import homeHeroEcosystem1 from '../assets/home-hero-ecosystem1.webp'
import homeCtaRunway from '../assets/home-cta-runway.webp'
import spotlightHeroStage from '../assets/spotlight-hero-stage.webp'
import spotlightMentorship from '../assets/spotlight-mentorship.webp'
import spotlightMarketplaceLaunch from '../assets/spotlight-marketplace-launch.webp'
import spotlightMissionCraft1 from '../assets/spotlight-mission-craft-1.webp'
import spotlightMissionCraft2 from '../assets/spotlight-mission-craft-2.webp'
import spotlightMissionTalent from '../assets/spotlight-mission-talent.webp'
import mirrorRebelTee from '../assets/mirror-rebel-tee-adorzia.webp'
import mirrorworkBomber from '../assets/mirrorwork-bomber-jacket-adorzia.webp'
import ajrakArchitectCoat1 from '../assets/ajrak-architect-coat-adorzia1.webp'
import phulkariRebornBlazer from '../assets/phulkari-reborn-blazer-adorzia.webp'
import rilliSculptTote from '../assets/rilli-sculpt-tote-adorzia.webp'
import khaddarModernSuit from '../assets/khaddar-modern-suit-adorzia.webp'

// Map of database paths to imported assets
const assetMap: Record<string, string> = {
  '/src/assets/hero-runway.webp': heroRunway,
  '/src/assets/home-designer-portrait-3.webp': homeDesignerPortrait3,
  '/src/assets/home-designer-portrait-1.webp': homeDesignerPortrait1,
  '/src/assets/home-designer-portrait-2.webp': homeDesignerPortrait2,
  '/src/assets/hero1.webp': hero1,
  '/src/assets/runway.webp': runway,
  '/src/assets/fashion.webp': fashion,
  '/src/assets/brand1.webp': brand1,
  '/src/assets/brand2.webp': brand2,
  '/src/assets/brand3.webp': brand3,
  '/src/assets/brand4.webp': brand4,
  '/src/assets/brand5.webp': brand5,
  '/src/assets/studio.webp': studio,
  '/src/assets/studio1.webp': studio1,
  '/src/assets/craft.webp': craft,
  '/src/assets/spotlight.webp': spotlight,
  '/src/assets/hero-home.webp': heroHome,
  '/src/assets/home-luxury-bridal.webp': homeLuxuryBridal,
  '/src/assets/home-heritage-craft.webp': homeHeritageCraft,
  '/src/assets/home-sustainable-fashion.webp': homeSustainableFashion,
  '/src/assets/home-fabric-innovation.webp': homeFabricInnovation,
  '/src/assets/home-hero-craft.webp': homeHeroCraft,
  '/src/assets/home-hero-runway.webp': homeHeroRunway,
  '/src/assets/home-hero-ecosystem1.webp': homeHeroEcosystem1,
  '/src/assets/home-cta-runway.webp': homeCtaRunway,
  '/src/assets/spotlight-hero-stage.webp': spotlightHeroStage,
  '/src/assets/spotlight-mentorship.webp': spotlightMentorship,
  '/src/assets/spotlight-marketplace-launch.webp': spotlightMarketplaceLaunch,
  '/src/assets/spotlight-mission-craft-1.webp': spotlightMissionCraft1,
  '/src/assets/spotlight-mission-craft-2.webp': spotlightMissionCraft2,
  '/src/assets/spotlight-mission-talent.webp': spotlightMissionTalent,
  '/src/assets/mirror-rebel-tee-adorzia.webp': mirrorRebelTee,
  '/src/assets/mirrorwork-bomber-jacket-adorzia.webp': mirrorworkBomber,
  '/src/assets/ajrak-architect-coat-adorzia1.webp': ajrakArchitectCoat1,
  '/src/assets/phulkari-reborn-blazer-adorzia.webp': phulkariRebornBlazer,
  '/src/assets/rilli-sculpt-tote-adorzia.webp': rilliSculptTote,
  '/src/assets/khaddar-modern-suit-adorzia.webp': khaddarModernSuit,
}

/**
 * Resolves a database-stored asset path to the correct production URL
 * @param dbPath - Path stored in database (e.g., '/src/assets/hero-runway.webp')
 * @returns Resolved asset URL for use in img src
 */
export const resolveAsset = (dbPath: string | null | undefined): string => {
  if (!dbPath) return ''
  
  // If it's already a resolved URL (http/https), return as-is
  if (dbPath.startsWith('http://') || dbPath.startsWith('https://')) {
    return dbPath
  }
  
  // Look up in asset map
  const resolved = assetMap[dbPath]
  if (resolved) return resolved
  
  // Fallback: return original path (for development or unknown paths)
  console.warn(`Asset not found in resolver: ${dbPath}`)
  return dbPath
}

/**
 * Resolves an array of image paths
 */
export const resolveAssets = (paths: string[] | null | undefined): string[] => {
  if (!paths) return []
  return paths.map(resolveAsset)
}
