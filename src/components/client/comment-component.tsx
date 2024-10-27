import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BadgeCheck } from 'lucide-react';
import { Comment } from '@/types/comments';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const CommentComponent = ({ comment }: { comment: Comment }) => {
  const { data }: any = useSession();
  const now = dayjs();
  const hourDifference = now.diff(dayjs(comment.created_at), 'hours');
  const dayDifference = now.diff(dayjs(comment.created_at), 'days');
  const weekDifference = now.diff(dayjs(comment.created_at), 'weeks');
  const mothDifference = now.diff(dayjs(comment.created_at), 'months');
  const fullDate = dayjs(comment.created_at).format('DD/MM/YYYY');
  return (
    <div
      className={
        'flex h-full min-h-1 w-full items-stretch justify-start gap-3'
      }>
      <div className={'flex min-h-1 flex-col'}>
        <Avatar className={'cursor-pointer'}>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className={'flex flex-col gap-2'}>
        <div className={'flex flex-col rounded-lg'}>
          <span
            className={
              'flex items-center gap-x-2 rounded-t-lg bg-secondary pb-0 pl-3 pr-3 pt-3 text-sm font-medium'
            }>
            {comment.user.full_name}
            <span className={'flex items-center gap-x-1 text-primary'}>
              <BadgeCheck className={'h-5 w-5'} />
              Đã mua hàng
            </span>
          </span>
          <div className={'relative'}>
            <p
              className={
                'rounded-b-lg bg-secondary pb-3 pl-3 pr-3 pt-2 text-sm'
              }>
              {comment.content}
            </p>
            <div className={'flex items-center gap-x-4 bg-white pl-3 pt-2'}>
              <span className={'text-xs'}>
                {hourDifference < 25
                  ? `${hourDifference} giờ`
                  : dayDifference < 8
                    ? `${dayDifference} ngày`
                    : weekDifference < 5
                      ? `${weekDifference} tuần`
                      : mothDifference < 13
                        ? `${mothDifference} tháng`
                        : `${fullDate}`}
              </span>
              <div
                className={
                  'cursor-pointer text-xs underline-offset-2 duration-0 hover:text-primary hover:underline'
                }>
                Phản hồi
              </div>
              {data && data.user.id === comment.user_id && (
                <>
                  <div
                    className={
                      'cursor-pointer text-xs underline-offset-2 duration-0 hover:text-blue-500 hover:underline'
                    }>
                    Chỉnh sửa
                  </div>
                  <div
                    className={
                      'cursor-pointer text-xs underline-offset-2 duration-0 hover:text-destructive hover:underline'
                    }>
                    Xóa
                  </div>
                </>
              )}
            </div>
            {comment.replies.length > 0 && (
              <div
                className={
                  'absolute -left-[30px] top-2 h-full w-[2px] bg-gray-300'
                }></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
