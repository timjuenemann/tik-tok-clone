import React, { ReactFragment } from 'react';
import { ReactComponent as Record } from '../assets/record.svg';
import { ReactComponent as Share } from '../assets/share.svg';
import { ReactComponent as Heart } from '../assets/heart.svg';
import { ReactComponent as HeartFilled } from '../assets/heart_filled.svg';
import { ReactComponent as Comments } from '../assets/comments.svg';
import { useDispatch } from 'react-redux';
import { likeVideo, VideoItem, unlikeVideo } from '../store/screenSlice';

export default function VideoActions({ item }: { item: VideoItem }) {
  const dispatch = useDispatch();

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <VideoAction count={item.likeCount}>
          {item.liked ? (
            <HeartFilled
              onClick={() => dispatch(unlikeVideo(item.id))}
              height={40}
              width={40}
              fill={'#fff'}
            />
          ) : (
            <Heart
              onClick={() => dispatch(likeVideo(item.id))}
              height={40}
              width={40}
              fill={'#fff'}
            />
          )}
        </VideoAction>
        <VideoAction count={item.commentCount}>
          <Comments height={35} width={35} fill={'#fff'} />
        </VideoAction>
        <VideoAction count={item.shareCount}>
          <Share height={35} width={35} fill={'#fff'} />
        </VideoAction>

        <Record
          height={40}
          width={40}
          className="rotatingRecord"
          style={{
            marginTop: 30,
          }}
        />
      </div>
    </div>
  );
}

function VideoAction(props: { children: ReactFragment; count: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '.8em',
        marginTop: 15,
      }}
    >
      {props.children}
      <div
        style={{
          marginTop: 5,
        }}
      >
        {props.count}
      </div>
    </div>
  );
}
