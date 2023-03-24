import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import Layout from "../Templates/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import "swiper/css";
import Image from "next/image";
import TopTextBox from "../Molecules/TopTextBox";
import style from "../../styles/style.module.css";

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
          <SwiperSlide className={style.slide}>
            <Image
              src="/top/slider01.jpg"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide className={style.slide}>
            <Image
              src="/top/slider02.jpg"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide className={style.slide}>
            <Image
              src="/top/slider03.jpg"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
        </Swiper>
      </Box>
      <Box>
        <Heading as="h2" mb="10">
          <Text align="center">受験カレンダーとは</Text>
        </Heading>
        <Flex w="100%" justify="space-between" wrap={["wrap"]}>
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
        </Flex>
      </Box>
    </Layout>
  );
}
