## アプリ概要

受験生向けに大学の検索、出願予定リストから入試スケジュールを表示するアプリです。

## デモ URL

https://cec-nine.vercel.app/

## デモアカウント

id:test@test.jp  
pass:test1234

## 機能一覧

### 大学検索機能

search ページにて大学名、エリア、入試日時などで大学の検索をできます。
検索結果から登録機能によりマイページで一覧表示する出願予定リストに登録することもできます。
![cec01](https://user-images.githubusercontent.com/1754504/232250551-3672601f-731e-431f-a209-5add2e224a2c.png)
![cec02](https://user-images.githubusercontent.com/1754504/232250556-26de1902-1d7f-4ac0-852c-65c2225a2b0b.png)

### マイページ機能

検索結果で登録された出願予定大学をリストで表示することができます。
![cec03](https://user-images.githubusercontent.com/1754504/232250558-97b2dad8-a245-48a6-bff8-b0f4ba6d5519.png)

### スケジュール機能

検索結果で登録された出願予定大学の出願締切や入試日、発表日、入学金支払い締切日をカレンダー形式で表示することができます。
![cec04](https://user-images.githubusercontent.com/1754504/232250560-d72ab4e0-7bb7-4364-bf95-9869ef06da0c.png)

## 環境構築

### フロントエンド

- React(v18.2.0)
- Next.js(v13.2.3)
- typescript(v4.9.5)
- chakra-ui(v2.4.2)
- react-hook-form(v7.43.5)
- swiper(v9.1.0)

### バックエンド

- Firebase (v9.17.2)

### デプロイ

- Vercel
