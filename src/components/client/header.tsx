'use client';
import React from 'react';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';

const Header = () => {
  return (
    <header className={'bg-emerald-600 py-3 text-white'}>
      <div className={'container mx-auto'}>
        <div className={'flex w-full items-center justify-between'}>
          <div className={'mt-0 w-full max-w-full'}>
            <ul
              className={
                'm-0 flex items-center justify-start gap-x-7 gap-y-4 p-0'
              }>
              <li
                className={
                  'flex list-none items-center gap-2 text-sm font-medium'
                }>
                <MapPin className={'h-6 w-6'} />
                <span>Thanh Xuân, Hà Nội, Việt Nam</span>
              </li>
              <li
                className={
                  'flex list-none items-center gap-2 text-sm font-medium'
                }>
                <Mail className={'h-6 w-6'} />
                <span>contact@ecogarden.com</span>
              </li>
              <li
                className={
                  'flex list-none items-center gap-2 text-sm font-medium'
                }>
                <Phone className={'h-6 w-6'} />
                <span>contact@ecogarden.com</span>
              </li>
            </ul>
          </div>
          <div className={'mt-0 max-w-full'}>
            <ul
              className={
                'm-0 flex items-center justify-end gap-x-2 gap-y-2 p-0'
              }>
              <li
                className={
                  'flex h-8 w-8 cursor-pointer list-none items-center justify-center gap-2 rounded bg-white text-sm font-medium'
                }>
                <Facebook className={'h-6 w-6 text-emerald-600'} />
              </li>
              <li
                className={
                  'flex h-8 w-8 cursor-pointer list-none items-center justify-center gap-2 rounded bg-white text-sm font-medium'
                }>
                <Instagram className={'h-6 w-6 text-emerald-600'} />
              </li>
              <li
                className={
                  'flex h-8 w-8 cursor-pointer list-none items-center justify-center gap-2 rounded bg-white text-sm font-medium'
                }>
                <Youtube className={'h-6 w-6 text-emerald-600'} />
              </li>
              <li
                className={
                  'flex h-8 w-8 cursor-pointer list-none items-center justify-center gap-2 rounded bg-white text-sm font-medium'
                }>
                <Twitter className={'h-6 w-6 text-emerald-600'} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
