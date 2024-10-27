'use client';

import React from 'react';
import './style.scss';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Link } from '@/navigation';

dayjs.locale('vi');

const Footer = () => {
  const now = dayjs().format('YYYY');
  return (
    <div className={'border-t border-solid bg-white'}>
      <div className={'pb-[60px] pt-[100px]'}>
        <div className={'container'}>
          <div className={'-mx-4 mt-0 flex flex-wrap'}>
            <div
              className={
                'mt-0 w-1/4 flex-[0_0_auto] shrink-0 px-4 md:w-1/3 md:flex-[0_0_auto] sm:w-1/2 sm:flex-[0_0_auto] xs:w-full xs:max-w-full'
              }>
              <div className={'mb-9'}>
                <div className={'mb-9'}>
                  <Link href={''} className={'text-4xl font-semibold'}>
                    EcoGarden.
                  </Link>
                </div>
                <div>
                  <p className={'mb-3 w-full'}>
                    các công ty hàng đầu chọn EcoGarden.
                    <br />
                    để xây dựng kỹ năng nghề nghiệp có nhu cầu lớn.
                  </p>
                  <ul className={'m-0 p-0'}>
                    <li className={'mb-2 list-none font-semibold'}>
                      Thanh Xuân, Hà Nội, Việt Nam
                    </li>
                    <li className={'list-none font-semibold'}>+123 456 7890</li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={
                'mt-0 w-1/4 flex-[0_0_auto] shrink-0 px-4 md:w-1/3 md:flex-[0_0_auto] sm:w-1/2 sm:flex-[0_0_auto] xs:w-full xs:max-w-full'
              }>
              <div className={'mb-9 md:ml-[60px]'}>
                <h4
                  className={
                    'relative mb-5 pb-5 text-xl font-semibold capitalize before:absolute before:bottom-1 before:left-0 before:h-[2px] before:w-16 before:rounded before:bg-black before:content-[""]'
                  }>
                  Thông tin hữu ích
                </h4>
                <div>
                  <ul className={'m-0 p-0'}>
                    <li className={'mb-2 list-none'}>
                      <Link href={''} className={'footer__link'}>
                        Giá trị đem lại
                      </Link>
                    </li>
                    <li className={'mb-2 list-none'}>
                      <Link href={''} className={'footer__link'}>
                        Ban cố vấn
                      </Link>
                    </li>
                    <li className={'mb-2 list-none'}>
                      <Link href={''} className={'footer__link'}>
                        Các đối tác
                      </Link>
                    </li>
                    <li className={'mb-2 list-none'}>
                      <Link href={''} className={'footer__link'}>
                        Trở thành đối tác
                      </Link>
                    </li>
                    <li className={'mb-2 list-none'}>
                      <Link href={''} className={'footer__link'}>
                        Làm việc tại EcoGarden.
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={
                'mt-0 w-1/4 flex-[0_0_auto] shrink-0 px-4 md:w-1/3 md:flex-[0_0_auto] sm:w-1/2 sm:flex-[0_0_auto] xs:w-full xs:max-w-full'
              }>
              <div className={'mb-9 md:ml-[60px]'}>
                <h4
                  className={
                    'relative mb-5 pb-5 text-xl font-semibold capitalize before:absolute before:bottom-1 before:left-0 before:h-[2px] before:w-16 before:rounded before:bg-black before:content-[""]'
                  }>
                  Về chúng tôi
                </h4>
                <div>
                  <ul className={'m-0 p-0'}>
                    <li className={'mb-2 list-none'}>
                      <Link href={''} className={'footer__link'}>
                        Liên hệ
                      </Link>
                    </li>
                    <li className={'mb-2 list-none'}>
                      <Link href={''} className={'footer__link'}>
                        Bài viết
                      </Link>
                    </li>
                    <li className={'mb-2 list-none'}>
                      <Link href={''} className={'footer__link'}>
                        Hướng dẫn
                      </Link>
                    </li>
                    <li className={'mb-2 list-none'}>
                      <Link href={''} className={'footer__link'}>
                        Sự kiện
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={
                'mt-0 w-1/4 flex-[0_0_auto] shrink-0 px-4 md:w-1/3 md:flex-[0_0_auto] sm:w-1/2 sm:flex-[0_0_auto] xs:w-full xs:max-w-full'
              }>
              <div className={'mb-9'}>
                <h4
                  className={
                    'relative mb-5 pb-5 text-xl font-semibold capitalize before:absolute before:bottom-1 before:left-0 before:h-[2px] before:w-16 before:rounded before:bg-black before:content-[""]'
                  }>
                  Cài đặt ứng dụng
                </h4>
                <div>
                  <p className={'mb-3 w-full'}>
                    các công ty hàng đầu chọn EcoGarden.
                    <br />
                    để xây dựng kỹ năng nghề nghiệp có nhu cầu lớn.
                  </p>
                  <ul
                    className={
                      'm-0 mb-9 flex items-center gap-x-2 gap-y-2 p-0'
                    }>
                    <li
                      className={
                        'flex h-8 w-8 cursor-pointer list-none items-center justify-center gap-2 rounded bg-primary text-sm font-medium'
                      }>
                      <Facebook className={'h-6 w-6 text-white'} />
                    </li>
                    <li
                      className={
                        'flex h-8 w-8 cursor-pointer list-none items-center justify-center gap-2 rounded bg-primary text-sm font-medium'
                      }>
                      <Instagram className={'h-6 w-6 text-white'} />
                    </li>
                    <li
                      className={
                        'flex h-8 w-8 cursor-pointer list-none items-center justify-center gap-2 rounded bg-primary text-sm font-medium'
                      }>
                      <Youtube className={'h-6 w-6 text-white'} />
                    </li>
                    <li
                      className={
                        'flex h-8 w-8 cursor-pointer list-none items-center justify-center gap-2 rounded bg-primary text-sm font-medium'
                      }>
                      <Twitter className={'h-6 w-6 text-white'} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'bg-primary px-0 py-4'}>
        <div className={'container'}>
          <div className={'-mx-4 mt-0 flex flex-wrap items-center'}>
            <div
              className={
                'mt-0 w-7/12 flex-[0_0_auto] shrink-0 px-4 sm:w-full sm:max-w-full'
              }>
              <div>
                <p className={'mb-0 text-sm text-white'}>
                  © 2020 - {now} ecogarden.com. All rights reserved.
                </p>
              </div>
            </div>
            <div
              className={
                'mt-0 w-5/12 flex-[0_0_auto] shrink-0 px-4 sm:w-full sm:max-w-full'
              }>
              <div>
                <ul className={'m-0 flex items-center justify-end gap-8 p-0'}>
                  <li className={'list-none'}>
                    <Link
                      href={''}
                      className={'footer_bottom_link text-sm text-white'}>
                      Điều khoản sử dụng
                    </Link>
                  </li>
                  <li className={'list-none'}>
                    <Link
                      href={''}
                      className={'footer_bottom_link text-sm text-white'}>
                      Chính sách bảo mật
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
