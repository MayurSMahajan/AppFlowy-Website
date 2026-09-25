'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useClient } from '@/lib/hooks/use-client';
import { DOWNLOAD_MODAL_EVENT, download } from '@/lib/download';
import { Storage } from '@/lib/storage';
import { getDownloadSteps, getOsFromName } from '@/components/download/download-steps';

function DownloadModal() {
  const [open, setOpen] = useState(false);
  const { os } = useClient();

  const currentOS = useMemo(() => getOsFromName(os?.name), [os]);

  useEffect(() => {
    const handleOpen = () => setOpen(true);

    window.addEventListener(DOWNLOAD_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(DOWNLOAD_MODAL_EVENT, handleOpen);
  }, []);

  const handleManualDownload = useCallback(() => {
    const url = Storage.get('manually_download_url');

    if (!url) return;
    download(url, false);
  }, []);

  const steps = useMemo(() => getDownloadSteps(currentOS), [currentOS]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={'fixed inset-0 z-50 bg-black/50'} />
        <Dialog.Content className={'download-modal fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 dark:bg-[#232729] sm:p-8'}>
          <div className={'flex items-start justify-between gap-4'}>
            <div>
              <Dialog.Title className={'text-lg font-semibold text-black dark:text-white sm:text-xl'}>
                Thanks for downloading
              </Dialog.Title>
              <Dialog.Description className={'mt-1 text-sm text-gray-500 dark:text-gray-400'}>
                {`The desktop app should have downloaded automatically. If not, you can `}
                <span onClick={handleManualDownload} className={'cursor-pointer text-primary underline'}>
                  download manually
                </span>
                .
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label={'Close'}
                className={'flex-shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10'}
              >
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M12 4L4 12M4 4L12 12'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </Dialog.Close>
          </div>
          <div className={'mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3'}>
            {steps.map((step) => (
              <div key={step.title} className={'flex flex-col gap-3'}>
                {step.image ? (
                  <div className={'relative overflow-hidden rounded-xl'}>
                    <Image src={step.image} alt={step.title} className={'h-auto w-full'} />
                  </div>
                ) : null}
                <div className={'font-semibold text-black dark:text-white'}>{step.title}</div>
                <div className={'text-sm leading-relaxed text-gray-500 dark:text-gray-400'}>{step.description}</div>
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DownloadModal;
