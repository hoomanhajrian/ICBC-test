'use client';

import AdSense from './AdSense';

export default function AdLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Ad - Always visible */}
      <div className="w-full bg-gray-50 dark:bg-gray-800/50 py-2 flex justify-center">
        <AdSense 
          adSlot="1234567890"
          adFormat="horizontal"
          style={{ maxWidth: '970px', width: '100%' }}
        />
      </div>
      
      {/* Middle Section with Side Ads */}
      <div className="flex flex-1 w-full">
        {/* Left Sidebar Ad - Desktop only */}
        <aside className="hidden lg:block bg-gray-50 dark:bg-gray-800/50 px-2">
          <div className="sticky top-4">
            <AdSense 
              adSlot="1111111111"
              adFormat="vertical"
              style={{ width: '160px', height: '600px' }}
            />
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
        
        {/* Right Sidebar Ad - Desktop only */}
        <aside className="hidden lg:block bg-gray-50 dark:bg-gray-800/50 px-2">
          <div className="sticky top-4">
            <AdSense 
              adSlot="2222222222"
              adFormat="vertical"
              style={{ width: '160px', height: '600px' }}
            />
          </div>
        </aside>
      </div>
      
      {/* Bottom Ad - Always visible */}
      <div className="w-full bg-gray-50 dark:bg-gray-800/50 py-2 flex justify-center">
        <AdSense 
          adSlot="0987654321"
          adFormat="horizontal"
          style={{ maxWidth: '970px', width: '100%' }}
        />
      </div>
    </div>
  );
}
