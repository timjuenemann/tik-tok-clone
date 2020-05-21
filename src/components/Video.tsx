/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { ReactFragment, useState } from 'react';
import { ReactComponent as Record } from '../assets/record.svg';
import { ReactComponent as Share } from '../assets/share.svg';
import { ReactComponent as Heart } from '../assets/heart.svg';
import { ReactComponent as HeartFilled } from '../assets/heart_filled.svg';
import { ReactComponent as Comments } from '../assets/comments.svg';
import { ReactComponent as Music } from '../assets/music.svg';
//@ts-ignore
import Marquee from 'react-double-marquee';

export interface VideoItem {
  username: string;
  description: string;
  soundName: string;
  videoURL: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
}

interface OwnProps {
  item: VideoItem;
  color: string;
}

export default function Video(props: OwnProps) {
  const { item, color } = props;

  const [dblClickPos, setDblClickPos] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  const handleDoubleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setDblClickPos({
      x: event.nativeEvent.clientX,
      y: event.nativeEvent.clientY,
    });
    setTimeout(() => {
      setDblClickPos({
        x: null,
        y: null,
      });
    }, 400);
  };

  return (
    <div
      className="Video"
      style={{
        backgroundColor: color,
        color: '#fff',
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* heart that pops up on dblClick */}
      <HeartFilled
        fill={'#fff'}
        className={`dblClickHeart ${
          !dblClickPos.x && !dblClickPos.y ? '' : 'is-active'
        }`}
        style={{
          position: 'absolute',
          top: dblClickPos.y ?? 0,
          left: dblClickPos.x ?? 0,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 40px',
            gridGap: 20,
            padding: 20,
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignContent: 'flex-end',
              flexDirection: 'column-reverse',
            }}
          >
            <div
              onDoubleClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                style={{
                  fontSize: '1.1em',
                  fontWeight: 'bold',
                }}
              >
                @{item.username}
              </div>
              <div style={{ marginTop: 6, fontSize: '0.9em' }}>
                {item.description}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: '0.9em',
                  display: 'flex',
                }}
              >
                <Music height={16} width={16} fill={'#fff'} />
                <div
                  style={{
                    marginLeft: 6,
                    width: 150,
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
          <div
            onDoubleClick={(e) => {
              e.stopPropagation();
            }}
          >
            <VideoOptions item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoOptions(props: { item: VideoItem }) {
  const { item } = props;

  const [liked, setLiked] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <VideoOption count={liked ? item.likeCount + 1 : item.likeCount}>
        {liked ? (
          <HeartFilled
            onClick={() => setLiked(false)}
            height={40}
            width={40}
            fill={'#fff'}
          />
        ) : (
          <Heart
            onClick={() => setLiked(true)}
            height={40}
            width={40}
            fill={'#fff'}
          />
        )}
      </VideoOption>
      <VideoOption count={item.commentCount}>
        <Comments height={35} width={35} fill={'#fff'} />
      </VideoOption>
      <VideoOption count={item.shareCount}>
        <Share height={35} width={35} fill={'#fff'} />
      </VideoOption>

      <Record
        height={40}
        width={40}
        className="rotatingRecord"
        style={{
          marginTop: 30,
        }}
      />
    </div>
  );
}

function VideoOption(props: { children: ReactFragment; count: number }) {
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
