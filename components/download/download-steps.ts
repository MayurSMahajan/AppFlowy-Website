import { StaticImageData } from 'next/image';
import step1Img from '@/assets/images/download/download-step-1.webp';
import step2Img from '@/assets/images/download/download-step-2.webp';
import step3Img from '@/assets/images/download/download-step-3.webp';

export type DesktopOS = 'macos' | 'windows' | 'linux';

export interface DownloadStep {
  title: string;
  description: string;
  image?: StaticImageData;
}

const manualDownloadStep = {
  title: '1. Download AppFlowy',
  description: `Your download should start automatically. If it doesn't, you can download it manually.`,
};

export function getOsFromName(name?: string): DesktopOS {
  const normalized = name?.toLowerCase().replaceAll(' ', '');

  if (normalized?.includes('windows')) return 'windows';
  if (normalized?.includes('linux')) return 'linux';
  return 'macos';
}

export function getDownloadSteps(os: DesktopOS): DownloadStep[] {
  switch (os) {
    case 'windows':
      return [
        manualDownloadStep,
        {
          title: '2. Install AppFlowy',
          description: `Open the installer (.exe) from your downloads folder and follow the setup wizard.`,
        },
        {
          title: '3. Launch AppFlowy',
          description: `Open AppFlowy from your Start menu to get started.`,
        },
      ];
    case 'linux':
      return [
        manualDownloadStep,
        {
          title: '2. Install AppFlowy',
          description: `Install the package (AppImage, .deb, or .rpm) using your preferred method.`,
        },
        {
          title: '3. Launch AppFlowy',
          description: `Open AppFlowy from your applications menu to get started.`,
        },
      ];
    case 'macos':
    default:
      return [
        { ...manualDownloadStep, image: step1Img },
        {
          title: '2. Install AppFlowy',
          description: `Open AppFlowy.dmg, then drag AppFlowy into your Applications folder.`,
          image: step2Img,
        },
        {
          title: '3. Launch AppFlowy',
          description: `Open AppFlowy from your Applications folder to get started.`,
          image: step3Img,
        },
      ];
  }
}
