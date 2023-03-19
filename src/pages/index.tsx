import { Box, HStack, Text, Heading } from "@chakra-ui/react";
import Layout from "../Templates/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import "swiper/css";
import Image from "next/image";
import TopTextBox from "../Molecules/TopTextBox";

export default function Home() {
  return (
    <Layout>
      <Box mb="10">
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect="fade"
          modules={[Autoplay, EffectFade]}
        >
          <SwiperSlide
            style={{ position: "relative", width: "100%", height: "500px" }}
          >
            <Image
              src="/top/slider01.jpg"
              fill
              alt=""
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{ position: "relative", width: "100%", height: "500px" }}
          >
            <Image
              src="/top/slider02.jpg"
              fill
              alt=""
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{ position: "relative", width: "100%", height: "500px" }}
          >
            <Image
              src="/top/slider03.jpg"
              fill
              alt=""
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
        </Swiper>
      </Box>
      <Box>
        <Heading as="h2" mb="10">
          <Text align="center">受験カレンダーとは</Text>
        </Heading>
        <HStack w="100%" justify="space-between">
          <TopTextBox
            title="自分が受けられる私大が見つかる"
            image="/top/img01.jpg"
            text="テキストダミーテキストダミーテキストダミーテキストダミー"
          />
          <TopTextBox
            title="受験スケジュールを決められる"
            image="/top/img02.jpg"
            text="テキストダミーテキストダミーテキストダミーテキストダミー"
          />
          <TopTextBox
            title="受験勉強に集中できる"
            image="/top/img03.jpg"
            text="テキストダミーテキストダミーテキストダミーテキストダミー"
          />
        </HStack>
      </Box>
    </Layout>
  );
}
