/* eslint-disable jsx-a11y/no-distracting-elements */
import React from 'react';
import { ReactComponent as Music } from '../assets/svg/music.svg';
//@ts-ignore
import Marquee from 'react-double-marquee';
import { VideoItem } from '../store/screenSlice';

interface OwnProps {
  item: VideoItem;
}

export default function VideoDetails({ item }: OwnProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'flex-end',
        flexDirection: 'column-reverse',
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            fontSize: '1.1em',
            fontWeight: 'bold',
          }}
        >
          @{item.username}
        </div>
        <div style={{ marginTop: 10, fontSize: '0.9em' }}>
          {item.description}{' '}
          {item.hashtags.map((name) => (
            <span key={name}>
              <strong>#{name}</strong>{' '}
            </span>
          ))}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: '0.9em',
            display: 'flex',
          }}
        >
          <Music height={16} width={16} fill={'#fff'} />
          <div
            style={{
              marginLeft: 6,
              width: 180,
              whiteSpace: 'nowrap',
            }}
          >
            <Marquee direction="left" delay={1000}>
              {item.soundName}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
}
