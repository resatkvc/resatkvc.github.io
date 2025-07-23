---
title: 'Yazılım Yaşam Döngüsü Nedir? Software Development Life Cycle(SDLC)'
date: 2024-01-02T00:00:00+00:00
author: Reşat Kavcı
layout: post
permalink: /yazilim-yasam-döngüsü/
categories: SoftwareDevelopment
tags: [Test, Software Test, QA, Testing, SDLC]
img: /assets/img/posts/software-development-life-cycle/yazılım-yasam-döngüsü-asamaları.jpg
description: 'Yazılımın başlangıcından sonuna kadar geçirdiği aşamaların süreçsel ve yönetimsel bir yaklaşımla yönetilmesine ve adı gibi bir döngü içinde varolan bir süreçtir. Bu döngü altı(6) adımdan oluşmaktadır.'
excerpt: 'Yazılım yaşam döngüsü, bir yazılım projesinin başlangıcından sonuna kadar geçirdiği tüm aşamaları kapsayan sistematik bir süreçtir. Bu yazımda SDLC aşamalarını ve modellerini detaylı olarak inceleyeceğiz.'
---

![Picture description](assets\img\posts\software-development-life-cycle\yazılım-yasam-döngüsü-asamaları.jpg){: .center-image }

Yazılımın başlangıcından sonuna kadar geçirdiği aşamaların süreçsel ve yönetimsel bir yaklaşımla yönetilmesine ve adı gibi bir döngü içinde varolan bir süreçtir. Bu döngü altı(6) adımdan oluşmaktadır.

1- **Planlama(Planning):** Bu adımda Yazılım planlanması ve görev dağılımı yapılır.

2- **Analiz(Analysis):** Yazılım yaşam döngüsünün en önemli aşamalarından biri olarak kabul edilir. Çünkü Analiz sürecinde projenin tüm işlevleri detaylı olarak bu aşamada belirlenir.

3- **Tasarım(Design):** Bu aşamada Analiz(Analysis) aşamasında ortaya çıkan proje detayları baz alınarak projende gerekli durumlarda bileşenlere ayrılır. Bu aşamada projede yapılacak işlemler adım adım belirlenir ve bir plan oluşturulur. Planın yanı sıra bu aşamada tasarım dokümanı da oluşturulur. _(Tasarım dokümanında proje bilgileri (amaç, kapsam vs), sistem tasarım bilgileri, tasarım detayları, veri modeli, kullanıcı arayüz tasarımları, UML Diagramları. Tasarım dokümanının amacı, yazılım geliştiricinin yazılımını geliştirirken referans alacağı ve proje sürecinde/sonrasında projeye dahil olacak yeni yazılımcıların projeyi daha kolay anlayabilmesini sağlayacak teknik bir dokümantasyona sahip olması gerekliliğidir.)_ 

4- **Uygulama/Üretim(Implementation):** İlk üç(3) aşamayı tamamlayıp yapılacak işlemleri detaylı olarak belirleyip projenin geliştirme aşamasıdır. Bu aşamada en kritik noktalardan biri artık Analiz işlemi yapılmaz. Proje artık Tasarım aşamasında oluşturulan planlama ile ilerlemelidir.

5- **Test ve Entegrasyon(Testing and Integration):** Artık bu aşamada yazılım geliştirme tamamlanmıştır. Müşteriye sunulmadan önce Test ekibi tarafından beta testlerinin gerçekleştirilmesi aşamasıdır. Bu aşamada oluşan hatalar(Bug) çözümlenmesi için geri gönderilir ve herşey tamamlandıktan sonra proje artık yayına alınır.

6- **Bakım ve Onarım(Maintenence):** Bu aşama artık projenin yayında(live) olması demektir. Burada oluşabilecek hataların giderilmesi yazılımın iyileştirilmesi ve yeni işlevlerin eklenmesi sürecidir. Bu kısımda müşterilerden gelen geri bildirimlerlede bu gereksinimler belirlenir ve o yönde geliştirmeler sağlanır.

## Kısaca SDLC’ nin Avanjları Nedir ?
- Tüm paydaşlar için geliştirme sürecine ilişkin görünürlük
- Verimli tahmin, planlama ve programlama ile ilerleme
- İyileştirilmiş risk yönetimi ve maliyet tahmini
- Sistematik yazılım teslimi ve daha iyi müşteri memnuniyeti

## Peki SDLC Modelleri Nelerdir ?
Yazılım geliştirme, süreç geliştirme aşamasında süreçlerin düzeni ve nasıl uygulanacağını ifade eden modellerdir. Karmaşık düzeni azaltmak ve böylelikle oluşacak krizleri önler. En önemlisi ise ürünlerin belirli bir kalitede olmasına olanak sağlar. 
Nedir peki bu modeller;

- Şelale Modeli (Waterfall Model)
- V Modeli (V-Shaped Model)
- Evrimsel Geliştirme (Evolutionary Development)
- Prototipleme (Prototyping)
- Kodla ve Düzelt (Code and Fix)
- Artımlı Geliştirme (Incremental Development)
- Spiral Model
- Big Bang Model
- RAD Model (Hızlı Uygulama Geliştirme)
- Agile Model (Çevik Model)

## V Modeli(V-Shaped Model) Nedir ?

![Picture description](assets\img\posts\software-development-life-cycle\v-model.jpg){: .center-image }

Adımlar V şeklini oluşturduğu için V-Şeklinde Model denilmiştir. En önemli modellerin başında gelir Aslında şelale modeline benzer fakat şöyle bir farkı vardır.

Yine planlama, ihtiyaç belirleme, üst seviye ve alt seviye tasarımlar vardır. Üst seviye de daha genel bakışa göre tasarım yapılır. Üst seviye tasarımların daha sonra daha detaylı alt seviye tasarımlarının yapıldığı görülür. Daha alt seviyelerinin açıldığı, bunların girdilerini-çıktılarını ve beklentilerinin yazıldığını söylenebilir.

Sonrasında kodlamaya geçilir. Buraya kadar şelale modeli ile benzerlikler söz konusudur. Aşağı doğru akan bir proje yönetimi söz konusudur. Buradan sonra yukarı doğru çıkılmaya başlanır.

Birim testleri yapılır. Her üretilen modülün testi yapılır. Daha sonra bu modüllerin/alt seviye tasarım ürünlerinin birbiri ile çalışma durumu, entegrasyon testleri yapılır ve kabul testleri aşamasında müşterinin kabul edip etmemesi ile ilgili müşteriye gidilir. Müşteri uygulamayı test eder. Sonra bakım başlar. Bu yaklaşımın diğer bir özelliği de, şekilden görüleceği üzere aynı hizada olan aşamaların birbirini karşılamasıdır.

Detaylı tasarım yapıldı. Bunun hemen karşısında kodlama bittikten sonra birim testleri yapılır. Yapmış olduğumuz tasarıma ait testler yapılır. Üst seviye tasarıma ait entegrasyon testleri yapılır. Her bir alt modülün birbiri ile uyumlu çalışıp çalışmadığı test edilir. İhtiyaç analizleri müşteriden istenir ve nelere ihtiyaç olunduğu çıkarılır. İhtiyaçların ise kabul testleri yapılır. “Evet o ihtiyaçlar sağlandı ve tamamdır, uygundur” şeklinde onunla ilgili test senaryoları hazırlanır. Planlamanın da bakım aşamasında karşılığını görüyoruz. Yaptığımız planlamaya uygun mu? Bakım aşamasından gelen bilgiler ile bu sorunun cevapları aranır.

V-Şeklinde model aslında biraz daha alta inip yukarı çıkan ve her aşamasının karşılığının olduğu bir modeldir. “Bir şey yapıldı ama bunun karşılığı doğru mudur?” sorgulamasının yapıldığı, en alta kadar inip kodlamaya kadar inip sonra da yukarıya doğru sistemi taşıyan bir yapıya sahiptir.