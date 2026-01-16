import BugFixImage from '@/assets/images/bugFix.png';
import Image from 'next/image';
import { motion } from 'motion/react';

export function ErrorBoundaryUI() {
  return (
    <motion.div
      initial={{ scaleX: 0, scaleY: 0 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ type: 'spring' }}
      className="fixed left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%] max-w-[200px]"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          alt="bug_fix"
          src={BugFixImage}
          className="mx-auto mt-6 h-[180px] w-[180px]"
        />
        <p className="text-nowrap text-2xl">An error just occurred</p>
        <p className="text-nowrap text-lg">need to fix</p>
      </div>
    </motion.div>
  );
}

export default ErrorBoundaryUI;
