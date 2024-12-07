"use client";
// import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import '@/css/satoshi.css';
import '@/css/style.css';

import React, {
  useEffect,
  useState,
} from 'react';

import Loader from '@/components/common/Loader';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <html lang="en">
            <body>
                {loading ? <Loader /> : children}
            </body>
        </html>
    );
}

export default RootLayout;