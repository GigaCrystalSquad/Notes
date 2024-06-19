import type { Metadata } from 'next'
import '../index.css'
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';


export const metadata: Metadata = {
    title: 'React App',
    description: 'Web site created with Next.js.',
  }
const MyApp: AppType = ({ Component, pageProps }) => {
    return (<html lang="en">
      <body>
        <div id="root">
        </div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>);
};
export default trpc.withTRPC(MyApp);