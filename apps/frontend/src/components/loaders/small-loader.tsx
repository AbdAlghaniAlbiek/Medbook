'use client';

import React from 'react';
import { Spinner } from '../ui/spinner';
import { motion } from 'motion/react';

function SmallLoader() {
  return (
    <motion.div
      initial={{ translateY: '40px' }}
      animate={{ translateY: '0px' }}
      transition={{ type: 'spring' }}
      className="flex flex-row gap-2 border bg-card p-2 rounded-md shadow-md justify-center items-center"
    >
      <Spinner size={'extraSmall'} />
      <p className="text-sm text-bold">Loading ...</p>
    </motion.div>
  );
}

export default SmallLoader;
