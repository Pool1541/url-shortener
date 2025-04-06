import UrlList from '@/components/url-list';
import useCreateShortUrlMutation from '@/hooks/use-create-short-url-mutation';
import { isValidUrl } from '@/lib/utils';
import { useRef } from 'react';

function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate, isPending } = useCreateShortUrlMutation();
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;

    if (!isValidUrl(url)) {
      alert('Please enter a valid URL.');
      return;
    }

    mutate(url, {
      onSuccess: () => {
        if (formRef.current) {
          formRef.current.reset();
        }
      },
    });
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-900'>
      <div className='p-8 rounded-lg shadow-xl bg-slate-800 w-96 max-w-full'>
        <h1 className='text-3xl font-light mb-8 text-center text-indigo-300'>URL Shortener</h1>
        <form ref={formRef} onSubmit={handleSubmit} className='space-y-6'>
          <div className='relative'>
            <input
              type='text'
              name='url'
              placeholder='Enter URL to shorten'
              className='w-full px-4 py-3 rounded-lg bg-slate-700 border-2 border-slate-600 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-400 transition-colors'
            />
          </div>
          <button
            type='submit'
            className='w-full py-3 rounded-lg bg-indigo-800 hover:bg-indigo-700 text-indigo-200 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-800 disabled:opacity-50'
            disabled={isPending}>
            Shorten URL
          </button>
        </form>
        <p className='mt-6 text-xs text-center text-slate-400'>
          Create short, memorable links with just one click
        </p>
      </div>
      <UrlList />
    </div>
  );
}

export default Home;
