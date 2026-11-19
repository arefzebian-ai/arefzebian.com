export type PlaygroundAspect = "4x5" | "4x3" | "1x1";

export type PlaygroundMedia = {
  caption: string;
  variant: PlaygroundAspect;
  setVideo: boolean;
  thumbnail?: {
    src: string;
    srcSet?: string;
    pixelWidth: number;
    pixelHeight: number;
  };
  video?: string;
  videoPoster?: {
    src: string;
    srcSet?: string;
    pixelWidth: number;
    pixelHeight: number;
  };
};

/**
 * Playground grid media. New local assets are interjected among the existing Framer set.
 * Captions follow CODE_NN.EXT.
 */
export const playgroundItems: PlaygroundMedia[] = [
  {
    caption: "CREATURE_01.jpg",
    variant: "4x5",
    setVideo: false,
    thumbnail: {
      pixelHeight: 768,
      pixelWidth: 1376,
      src: "https://framerusercontent.com/images/pVC10RhrCd68xkBYfvpVIMQ1M.png?width=1376&height=768",
      srcSet:
        "https://framerusercontent.com/images/pVC10RhrCd68xkBYfvpVIMQ1M.png?scale-down-to=512&width=1376&height=768 512w,https://framerusercontent.com/images/pVC10RhrCd68xkBYfvpVIMQ1M.png?scale-down-to=1024&width=1376&height=768 1024w,https://framerusercontent.com/images/pVC10RhrCd68xkBYfvpVIMQ1M.png?width=1376&height=768 1376w",
    },
  },
  {
    caption: "AN_01.MP4",
    variant: "1x1",
    setVideo: true,
    video: "https://framerusercontent.com/assets/DCaQwMwnJP4quSKDyym7IKTHYTo.mp4",
    videoPoster: {
      pixelHeight: 1350,
      pixelWidth: 1080,
      src: "https://framerusercontent.com/images/BwNwmQ8SWffQEcupuccHxbtDjYE.jpg?width=1080&height=1350",
      srcSet:
        "https://framerusercontent.com/images/BwNwmQ8SWffQEcupuccHxbtDjYE.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/BwNwmQ8SWffQEcupuccHxbtDjYE.jpg?width=1080&height=1350 1080w",
    },
  },
  {
    caption: "a14_01.mp4",
    variant: "4x5",
    setVideo: true,
    video: "https://framerusercontent.com/assets/gr2WzRNeInA50fCUdRAc7WLvTE.mp4",
    videoPoster: {
      pixelHeight: 1920,
      pixelWidth: 1080,
      src: "https://framerusercontent.com/images/TvL1dzucijcjyW1liP9XRiX79Q.jpg?width=1080&height=1920",
      srcSet:
        "https://framerusercontent.com/images/TvL1dzucijcjyW1liP9XRiX79Q.jpg?scale-down-to=1024&width=1080&height=1920 576w,https://framerusercontent.com/images/TvL1dzucijcjyW1liP9XRiX79Q.jpg?width=1080&height=1920 1080w",
    },
  },
  // Interject: mill photo
  {
    caption: "RIVITED_01.JPG",
    variant: "4x5",
    setVideo: false,
    thumbnail: {
      pixelHeight: 640,
      pixelWidth: 480,
      src: "/playground/rivited-01.webp",
    },
  },
  {
    caption: "AESOP_02.JPG",
    variant: "4x5",
    setVideo: false,
    thumbnail: {
      pixelHeight: 2088,
      pixelWidth: 1671,
      src: "https://framerusercontent.com/images/C3xTm9HjRkEhBVkbxCv7iw4nxc.jpg?width=1671&height=2088",
      srcSet:
        "https://framerusercontent.com/images/C3xTm9HjRkEhBVkbxCv7iw4nxc.jpg?scale-down-to=1024&width=1671&height=2088 819w,https://framerusercontent.com/images/C3xTm9HjRkEhBVkbxCv7iw4nxc.jpg?scale-down-to=2048&width=1671&height=2088 1638w,https://framerusercontent.com/images/C3xTm9HjRkEhBVkbxCv7iw4nxc.jpg?width=1671&height=2088 1671w",
    },
  },
  {
    caption: "IH_01.JPG",
    variant: "4x3",
    setVideo: false,
    thumbnail: {
      pixelHeight: 1255,
      pixelWidth: 1671,
      src: "https://framerusercontent.com/images/mKgdyEYEZwfNkJV4XjfkuCmAzlA.jpg?width=1671&height=1255",
      srcSet:
        "https://framerusercontent.com/images/mKgdyEYEZwfNkJV4XjfkuCmAzlA.jpg?scale-down-to=512&width=1671&height=1255 512w,https://framerusercontent.com/images/mKgdyEYEZwfNkJV4XjfkuCmAzlA.jpg?scale-down-to=1024&width=1671&height=1255 1024w,https://framerusercontent.com/images/mKgdyEYEZwfNkJV4XjfkuCmAzlA.jpg?width=1671&height=1255 1671w",
    },
  },
  {
    caption: "AD_01.MP4",
    variant: "4x5",
    setVideo: true,
    video: "https://framerusercontent.com/assets/QRk2hV1ufOTcJ1bw36TMOdgP0.mp4",
    videoPoster: {
      pixelHeight: 1280,
      pixelWidth: 720,
      src: "https://framerusercontent.com/images/dg1nbwz6AZXU0MHdKwzPUIm3U.jpg?width=720&height=1280",
      srcSet:
        "https://framerusercontent.com/images/dg1nbwz6AZXU0MHdKwzPUIm3U.jpg?scale-down-to=1024&width=720&height=1280 576w,https://framerusercontent.com/images/dg1nbwz6AZXU0MHdKwzPUIm3U.jpg?width=720&height=1280 720w",
    },
  },
  {
    caption: "DCT_01.JPG",
    variant: "1x1",
    setVideo: false,
    thumbnail: {
      pixelHeight: 1672,
      pixelWidth: 1671,
      src: "https://framerusercontent.com/images/TsY9kAen4NYtSQqktgojui46INo.jpg?width=1671&height=1672",
      srcSet:
        "https://framerusercontent.com/images/TsY9kAen4NYtSQqktgojui46INo.jpg?scale-down-to=1024&width=1671&height=1672 1023w,https://framerusercontent.com/images/TsY9kAen4NYtSQqktgojui46INo.jpg?width=1671&height=1672 1671w",
    },
  },
  // Interject: desk / lightroom clip
  {
    caption: "RIVITED_02.MP4",
    variant: "4x5",
    setVideo: true,
    video: "/playground/rivited-02.mp4",
    videoPoster: {
      pixelHeight: 1080,
      pixelWidth: 608,
      src: "/playground/rivited-02-poster.webp",
    },
  },
  {
    caption: "MOS_01.MP4",
    variant: "4x5",
    setVideo: true,
    video: "https://framerusercontent.com/assets/3SJlSeuNxEx0U8skA0YwfKpP4I0.mp4",
    videoPoster: {
      pixelHeight: 1350,
      pixelWidth: 1080,
      src: "https://framerusercontent.com/images/B35fpBzGgBeqnPC8xxl4QJn8vs.jpg?width=1080&height=1350",
      srcSet:
        "https://framerusercontent.com/images/B35fpBzGgBeqnPC8xxl4QJn8vs.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/B35fpBzGgBeqnPC8xxl4QJn8vs.jpg?width=1080&height=1350 1080w",
    },
  },
  {
    caption: "NOTH_01.JPG",
    variant: "4x5",
    setVideo: false,
    thumbnail: {
      pixelHeight: 2088,
      pixelWidth: 1671,
      src: "https://framerusercontent.com/images/ss9pIktuepNVDlbdIEGdJhZHk.jpg?width=1671&height=2088",
      srcSet:
        "https://framerusercontent.com/images/ss9pIktuepNVDlbdIEGdJhZHk.jpg?scale-down-to=1024&width=1671&height=2088 819w,https://framerusercontent.com/images/ss9pIktuepNVDlbdIEGdJhZHk.jpg?scale-down-to=2048&width=1671&height=2088 1638w,https://framerusercontent.com/images/ss9pIktuepNVDlbdIEGdJhZHk.jpg?width=1671&height=2088 1671w",
    },
  },
  {
    caption: "HBT_01.JPG",
    variant: "4x5",
    setVideo: false,
    thumbnail: {
      pixelHeight: 2088,
      pixelWidth: 1671,
      src: "https://framerusercontent.com/images/BBPTmdQEz3J1wpS21h6Tc30K6s.jpg?width=1671&height=2088",
      srcSet:
        "https://framerusercontent.com/images/BBPTmdQEz3J1wpS21h6Tc30K6s.jpg?scale-down-to=1024&width=1671&height=2088 819w,https://framerusercontent.com/images/BBPTmdQEz3J1wpS21h6Tc30K6s.jpg?scale-down-to=2048&width=1671&height=2088 1638w,https://framerusercontent.com/images/BBPTmdQEz3J1wpS21h6Tc30K6s.jpg?width=1671&height=2088 1671w",
    },
  },
  {
    caption: "CHR_01.JPG",
    variant: "1x1",
    setVideo: false,
    thumbnail: {
      pixelHeight: 1672,
      pixelWidth: 1672,
      src: "https://framerusercontent.com/images/3O2Ze5ElUQncjS00uZ4OWncyGc8.jpg?width=1672&height=1672",
      srcSet:
        "https://framerusercontent.com/images/3O2Ze5ElUQncjS00uZ4OWncyGc8.jpg?scale-down-to=512&width=1672&height=1672 512w,https://framerusercontent.com/images/3O2Ze5ElUQncjS00uZ4OWncyGc8.jpg?scale-down-to=1024&width=1672&height=1672 1024w,https://framerusercontent.com/images/3O2Ze5ElUQncjS00uZ4OWncyGc8.jpg?width=1672&height=1672 1672w",
    },
  },
  {
    caption: "HBT_02.JPG",
    variant: "4x3",
    setVideo: false,
    thumbnail: {
      pixelHeight: 1255,
      pixelWidth: 1671,
      src: "https://framerusercontent.com/images/aOb0NVeConBw1VFQ9jXMJnYy0.jpg?width=1671&height=1255",
      srcSet:
        "https://framerusercontent.com/images/aOb0NVeConBw1VFQ9jXMJnYy0.jpg?scale-down-to=512&width=1671&height=1255 512w,https://framerusercontent.com/images/aOb0NVeConBw1VFQ9jXMJnYy0.jpg?scale-down-to=1024&width=1671&height=1255 1024w,https://framerusercontent.com/images/aOb0NVeConBw1VFQ9jXMJnYy0.jpg?width=1671&height=1255 1671w",
    },
  },
  {
    caption: "MNC_01.MP4",
    variant: "4x5",
    setVideo: true,
    video: "https://framerusercontent.com/assets/URBDcsxwIhPaHKfprBG2mB6AM.mp4",
    videoPoster: {
      pixelHeight: 1350,
      pixelWidth: 1080,
      src: "https://framerusercontent.com/images/k8laITuag7pBrI4uXpLJZ2OGFo.jpg?width=1080&height=1350",
      srcSet:
        "https://framerusercontent.com/images/k8laITuag7pBrI4uXpLJZ2OGFo.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/k8laITuag7pBrI4uXpLJZ2OGFo.jpg?width=1080&height=1350 1080w",
    },
  },
  {
    caption: "RNC_01.MP4",
    variant: "4x3",
    setVideo: false,
    thumbnail: {
      pixelHeight: 1256,
      pixelWidth: 1673,
      src: "https://framerusercontent.com/images/oKeKPndRTeXeDR8oN0jgzcVBplM.jpg?width=1673&height=1256",
      srcSet:
        "https://framerusercontent.com/images/oKeKPndRTeXeDR8oN0jgzcVBplM.jpg?scale-down-to=512&width=1673&height=1256 512w,https://framerusercontent.com/images/oKeKPndRTeXeDR8oN0jgzcVBplM.jpg?scale-down-to=1024&width=1673&height=1256 1024w,https://framerusercontent.com/images/oKeKPndRTeXeDR8oN0jgzcVBplM.jpg?width=1673&height=1256 1673w",
    },
  },
  {
    caption: "HBT_03.JPG",
    variant: "1x1",
    setVideo: false,
    thumbnail: {
      pixelHeight: 1672,
      pixelWidth: 1671,
      src: "https://framerusercontent.com/images/zkZpUA5XPtgy0lKc67X9t0R95Kg.jpg?width=1671&height=1672",
      srcSet:
        "https://framerusercontent.com/images/zkZpUA5XPtgy0lKc67X9t0R95Kg.jpg?scale-down-to=1024&width=1671&height=1672 1023w,https://framerusercontent.com/images/zkZpUA5XPtgy0lKc67X9t0R95Kg.jpg?width=1671&height=1672 1671w",
    },
  },
  {
    caption: "MNC_02.MP4",
    variant: "4x5",
    setVideo: true,
    video: "https://framerusercontent.com/assets/hALaQkAvGiCaZqDX48GqTaYfZlw.mp4",
    videoPoster: {
      pixelHeight: 1350,
      pixelWidth: 1080,
      src: "https://framerusercontent.com/images/Fr2TlDvbzLj1gk7UIqZhW3gmVHI.jpg?width=1080&height=1350",
      srcSet:
        "https://framerusercontent.com/images/Fr2TlDvbzLj1gk7UIqZhW3gmVHI.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/Fr2TlDvbzLj1gk7UIqZhW3gmVHI.jpg?width=1080&height=1350 1080w",
    },
  },
  // Interject: hangar / silhouette clip
  {
    caption: "RIVITED_03.MP4",
    variant: "4x3",
    setVideo: true,
    video: "/playground/rivited-03.mp4",
    videoPoster: {
      pixelHeight: 508,
      pixelWidth: 960,
      src: "/playground/rivited-03-poster.webp",
    },
  },
  {
    caption: "HBT_04.JPG",
    variant: "4x3",
    setVideo: false,
    thumbnail: {
      pixelHeight: 1255,
      pixelWidth: 1671,
      src: "https://framerusercontent.com/images/M6pDPC4vSAJfk7HMQWvswpygYp0.jpg?width=1671&height=1255",
      srcSet:
        "https://framerusercontent.com/images/M6pDPC4vSAJfk7HMQWvswpygYp0.jpg?scale-down-to=512&width=1671&height=1255 512w,https://framerusercontent.com/images/M6pDPC4vSAJfk7HMQWvswpygYp0.jpg?scale-down-to=1024&width=1671&height=1255 1024w,https://framerusercontent.com/images/M6pDPC4vSAJfk7HMQWvswpygYp0.jpg?width=1671&height=1255 1671w",
    },
  },
  {
    caption: "DCT_02.JPG",
    variant: "4x5",
    setVideo: false,
    thumbnail: {
      pixelHeight: 2089,
      pixelWidth: 1673,
      src: "https://framerusercontent.com/images/pkEt5KUvm3s4pSBEkDERGGYOA.jpg?width=1673&height=2089",
      srcSet:
        "https://framerusercontent.com/images/pkEt5KUvm3s4pSBEkDERGGYOA.jpg?scale-down-to=1024&width=1673&height=2089 820w,https://framerusercontent.com/images/pkEt5KUvm3s4pSBEkDERGGYOA.jpg?scale-down-to=2048&width=1673&height=2089 1640w,https://framerusercontent.com/images/pkEt5KUvm3s4pSBEkDERGGYOA.jpg?width=1673&height=2089 1673w",
    },
  },
  {
    caption: "INF_01.MP4",
    variant: "4x5",
    setVideo: true,
    video: "https://framerusercontent.com/assets/yG3gOK8uIUOPnteFR12tKLwQVY4.mp4",
    videoPoster: {
      pixelHeight: 1350,
      pixelWidth: 1080,
      src: "https://framerusercontent.com/images/0iYtT5Rt63Hbdw9HIucgp2mYkk.jpg?width=1080&height=1350",
      srcSet:
        "https://framerusercontent.com/images/0iYtT5Rt63Hbdw9HIucgp2mYkk.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/0iYtT5Rt63Hbdw9HIucgp2mYkk.jpg?width=1080&height=1350 1080w",
    },
  },
  {
    caption: "AN_02.MP4",
    variant: "1x1",
    setVideo: true,
    video: "https://framerusercontent.com/assets/fMrbc2QxVQCzMQ9uDZ1sVu84hFg.mp4",
    videoPoster: {
      pixelHeight: 1350,
      pixelWidth: 1080,
      src: "https://framerusercontent.com/images/faXaQjVdIylM8HOyi5VLSuPnLM.jpg?width=1080&height=1350",
      srcSet:
        "https://framerusercontent.com/images/faXaQjVdIylM8HOyi5VLSuPnLM.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/faXaQjVdIylM8HOyi5VLSuPnLM.jpg?width=1080&height=1350 1080w",
    },
  },
];
