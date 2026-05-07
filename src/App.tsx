import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { ControlPanel } from './components/ControlPanel';
import { PreviewPane } from './components/PreviewPane';
import { useQrStudio } from './hooks/useQrStudio';

export default function App() {
  const studio = useQrStudio();

  return (
    <div className="bg-surface text-on-surface flex h-full min-h-0 flex-col overflow-hidden">
      <AppHeader />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden min-[1024px]:flex-row">
        <ControlPanel
          content={studio.content}
          setContent={studio.setContent}
          marginBlocks={studio.marginBlocks}
          setMarginBlocks={studio.setMarginBlocks}
          errorCorrection={studio.errorCorrection}
          setErrorCorrection={studio.setErrorCorrection}
          typeNumber={studio.typeNumber}
          setTypeNumber={studio.setTypeNumber}
          dotColorKey={studio.dotColorKey}
          setDotColorKey={studio.setDotColorKey}
          bgColorKey={studio.bgColorKey}
          setBgColorKey={studio.setBgColorKey}
          dotShape={studio.dotShape}
          setDotShape={studio.setDotShape}
          eyeShape={studio.eyeShape}
          setEyeShape={studio.setEyeShape}
          useEyeColor={studio.useEyeColor}
          setUseEyeColor={studio.setUseEyeColor}
          logoDataUrl={studio.logoDataUrl}
          onLogoFile={studio.onLogoFile}
          openGalleryPlaceholder={studio.openGalleryPlaceholder}
          outputMode={studio.outputMode}
          setOutputMode={studio.setOutputMode}
          caption={studio.caption}
          setCaption={studio.setCaption}
          contentErrorKey={studio.contentErrorKey}
          generateQr={studio.generateQr}
          downloadDefault={studio.downloadDefault}
        />
        <PreviewPane
          qrContainerRef={studio.qrContainerRef}
          hasGenerated={studio.hasGenerated}
          outputMode={studio.outputMode}
          caption={studio.caption}
          content={studio.content}
          downloadPng={studio.downloadPng}
          downloadSvg={studio.downloadSvg}
          printQr={studio.printQr}
        />
      </main>
      <AppFooter />
    </div>
  );
}
