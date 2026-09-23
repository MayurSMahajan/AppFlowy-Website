'use client';

import Dialog from '@mui/material/Dialog';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import ImportImage from '@/assets/images/vs-notion/import.png';
import { Button } from '@/components/ui/button';

type ImportSource = 'notion' | 'confluence';

function ImportLink({ importBaseURL, source }: { importBaseURL: string; source: ImportSource }) {
  const sourceName = source === 'confluence' ? 'Confluence' : 'Notion';
  const [open, setOpen] = React.useState(false);
  const [redirectTo, setRedirectTo] = React.useState('');

  const handleClose = () => {
    setOpen(false);
    window.location.search = '';
  };

  useEffect(() => {
    const returnUrl = new URL(window.location.href);

    setOpen(returnUrl.searchParams.get('importing') === 'true');
    returnUrl.searchParams.set('importing', 'true');
    setRedirectTo(encodeURIComponent(returnUrl.toString()));
  }, []);

  return (
    <>
      <Button
        asChild
        size={'xl'}
        className={'min-w-[180px] rounded-lg bg-night-blue text-white transition-colors hover:bg-night-blue/90 max-sm:w-full'}
      >
        <Link
          target={'_blank'}
          href={`${importBaseURL}/import?action=import&source=${source}&redirectToImport=${redirectTo}`}
        >
          Import from {sourceName}
        </Link>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '15px',
            width: '351px',
            maxWidth: '90%',
          },
        }}
      >
        <div className={'flex flex-col items-center justify-center gap-6 rounded-[15px] bg-white p-10'}>
          <Image src={ImportImage} alt={`Import from ${sourceName}`} width={189} height={121} />
          <div className={'flex flex-col items-center justify-center gap-4'}>
            <div className={'text-center text-[24px] font-medium'}>Importing...</div>
            <div className={'text-center text-base font-normal text-[#58585a]'}>
              We’ll send you an email when it’s done.
            </div>
            <div onClick={handleClose} className={'download-btn cursor-pointer'}>
              Close
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ImportLink;
