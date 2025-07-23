---
title: 'Postman ile API Test'
date: 2024-01-13T00:00:00+00:00
author: Reşat Kavcı
layout: post
permalink: /postman-ile-api-test/
categories: postman servis testleri
tags: [Test, QA, Testing, Postman, PostmanAPI, Servis Testleri]
img: assets\img\posts\postman-api-test\baslik.jpg
description: 'Postman ile API Testi'
excerpt: 'Bu yazımda sizlere Postman ile API(Application Programming Interface) testinin nasıl yapılacağından bahsedeğim. Öncelike bu iki kavram nedir kısaca hadi açıklayalım.'
---

Merhaba Herkese,
Bu yazımda sizlere Postman ile API(Application Programming Interface) testinin nasıl yapılacağından bahsedeğim. Öncelike bu iki kavram nedir kısaca hadi açıklayalım.

![Picture description](assets\img\posts\postman-api-test\baslik.jpg){: .center-image }

# Postman Nedir?

Postman, API geliştirme süreçlerini kolaylaştıran bir araçtır. Uzun kodlarla uğraşmadan API’ları paylaşabilir, monitör edebilir ve hızlıca test edebiliriz. Ayrıca, API dokümantasyonunu hazırlamak için çok kullanışlıdır.

![Picture description](assets\img\posts\postman-api-test\api-nedir.jpg){: .center-image }

# API Nedir?

API, yazılım uygulamaları arasında iletişim kurmayı sağlayan bir arayüzdür. API’ler, farklı yazılım sistemleri arasında veri ve işlevsellik paylaşımını mümkün kılarlar.

Haydi şimdi Postman ile API testleri yapalım.

Fake API olarak ben regres.in(https://reqres.in/)sayfasını kullanacağım.

Farklı fake API sitelerinden sizlerde testlerinizi yapabilirsiniz..
- https://dummyjson.com/docs
- https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth
- https://api.nasa.gov/
- https://developer.atlassian.com/cloud/trello/rest/api-group-actions/#api-group-actions

Şimdi Postman üzerinden API testlerimize başlayalım.

![Picture description](assets\img\posts\postman-api-test\creat-collection.jpg){: .center-image }

Postman’i ilk açtığımızda yukarıdaki ekran bizi karşılar. Burada öncelikli olarak “collection” oluşturmalıyız. Hızlı şekilde “+” butonu veya “Creat collection” veya “New” butonuna basıp açılan pencereden Collection seçebiliriz.

![Picture description](assets\img\posts\postman-api-test\new-collection-add-request.jpg){: .center-image }

Artık çağrılarımızı oluşturacağımız “Add Reques” kısmına geldik. ister New Collection klasörü altında ki Add arequestest kısmından isterseniz üç noktaya tıklayıp açılan pencereden Add request diyebilirsiniz.

![Picture description](assets\img\posts\postman-api-test\get-istek.jpg){: .center-image }

Collection yani klasörün adını ve ilk çağrımızın request dosya adını mause ile üzerine geldiğinizde oluşan üç noktadan Rename diyerek düzenleyebilir veya CTRL+E kısayolu ile hızlıca yine dosya adlarını düzenleyebilirsiniz.

![Picture description](assets\img\posts\postman-api-test\htpp-method.jpg){: .center-image }

Artık çağrılarımıza başlayacağımız için öncelikle sıklıkla kullanacağımız Çağrı Methodlarından bahsedeyim..

**GET:** Serverdaki bir bilgiyi sadece “Read(okumak)” için kullanılır. Yani bilgiyi alır.
**PUT/PATCH:** Server’daki bir veriyi güncellemek için kullanılır. “Update(Güncelle”)
**POST:** Server’a “Create(Oluştur)” komutu gönderir
**DELETE:** Sunucudaki bir veriyi silmek için kullanılır. “Delete(Sil)”

![Picture description](assets\img\posts\postman-api-test\get-response.jpg){: .center-image }

API sayfamızdan GET methodu olan __“LIST USERS”__ için çağrımızı attık ve sayfamızı incelediğinizde response olarak hem status kodu (200) hemde response nasıl dönmesi gerektiği JSON dosyası olarak verilmiş.

Send butonuna tıkladığımızda response olarak bize veriler dönmüştür. Response kısmında Body/ Pretty kısmı seçiliyken response verisinin hangi formatta olacağını seçebiliriz burada ben JSON olarak görüntülemek istedim.

Ayrıca dönen response ait status code 200 kaç milisaniyede döndüğü 37ms ve boyutu 1,92kb gibi verileride görebilmekteyiz.

![Picture description](assets\img\posts\postman-api-test\get-iki-istek.jpg){: .center-image }

Farklı bir çağrı yapabilmemiz için yine klasörümüze mause ile geldiğimizde üç noktadan Add request tıklamamız ve yukarıdaki gibi çağrı dosya adını ve URL bilgisini girip Send dediğimizde isteğimizi atmış oluyoruz.

Bu sefer 404(Not Found) olarak response dönsün. 404 hatası veri yoksa(bulunmuyorsa) gelmektedir.

""
https://reqres.in/api/users/23

""

Response

""
{}

"

Şimdide bir Create için istek atalım bunun sonucunda bir veri oluşturalım.API sayfamızda POST ve Create için bilgiler verilmiş o doğrultuda Postman üzerinden işlemlerimizi sağlayıp response beklendiği şekilde mi oluşuyor görelim.

Request

{% highlight java %}
{
    "name": "morpheus",
    "job": "leader"
}
{% endhighlight %}

Response (201)

{% highlight java %}
{
    "name": "morpheus",
    "job": "leader",
    "id": "819",
    "createdAt": "2024-01-11T23:18:36.943Z"
}
{% endhighlight %}

![Picture description](assets\img\posts\postman-api-test\post-request.jpg){: .center-image }

Postman üzerinen URL (https://reqres.in/api/users) bilgisini yazıp sonrasında Body kısmını seçin / raw işaretli ve dosya formatıda JSON olarak seçip API sayfasında ki request şekilde düzenledikten sonra Send dediğimizde bize response da “id” ve “createdAt” olarak oluşturulmuş verimizi görebiliriz. Status code 201 olması beklenmekteydi ve burada 201 olarak döndüğünüde görebiliyoruz.

Şimdi **PUT/PACTH** yani varolan bir veriyi güncellemeye çalışalım.

![Picture description](assets\img\posts\postman-api-test\puth-istek.jpg){: .center-image }

Burada API sayfasında belirtilen user/2 kişisi için bir update işlemi sağlayıp sonrasında GET ile güncelleme sağladığımız user/2 ki kontrol edebiliriz. status durumu 200 dönmesi beklenir ve o şekilde döndüğü başarılı oldu.

Son olarak ise **DELETE** işlemi ile server da olan bir veriyi silelim.

![Picture description](assets\img\posts\postman-api-test\delete-istek.jpg){: .center-image }

Burada DELETE işlemi ile user/2 olan veriyi başarılı şekilde sildiğimiz ve API sayfasında respoınse status code 204 olarak dönmesi bilgisi ile postmande bizim response bilgimiz başarılı şekilde gerçekleşmiştir.

# Peki bu çağrılarımızı toplu olarak nasıl koşabiliriz ?

![Picture description](assets\img\posts\postman-api-test\run-api.jpg){: .center-image }

Bunun için collection klasörümüze mause ile geldiğimizde üç noktaya tıklayıp **“Run Collection”** tıklayıp sonrasında **Run API Test** butonuna tıklayın.

![Picture description](assets\img\posts\postman-api-test\run-collection.jpg){: .center-image }

Run API Test dedikten sonra Postman bize oluşturduğumuz çağrıları toplu olarak isteklerini yapar ve sonucu bize gösterir.

# BaseURL Nedir? Avantajları Nelerdir?

BaseURL,bir API’nin temel URL’ini belirtmek için kullanılan bir terimdir. API’nin temel URL’i, API’nin tüm endpoint’lerine yapılan isteklerin başlangıç noktasını belirtir.
“BaseURL” belirtilmezse, her bir endpoint için tam URL’yi ayrı ayrı belirtmemiz gerekir.

Peki baseURL’in ne gibi avantajlar sağlar;

**Temiz ve Düzenli Çağrılar:** BaseURL belirlemek her bir isteği yazarken sadece endpoint'in geri kalanını belirtmemiz yeterlidir. Bu durumda istekleri daha okunabilir ve düzenli hale getirir.

**Kolayca Taşınabilirlik:** Eğer API’nin temel URL’sini değiştirmeniz gerektiğinde, sadece bir yerde baseURL'i güncellemeniz yeterlidir. Bu, tüm endpoint'leri tek bir yerden yönetebilmemize olanak tanır.

**Ortam (Environment) Değişkenleri ile Kullanım:** Postman gibi araçlar, farklı ortamlarda (örneğin, geliştirme, test, prodüksiyon) çalışırken kullanılabilen ortam değişkenlerini destekler. Bu, baseURL'i çevre değişkenleriyle bağlayarak, farklı ortamlar arasında geçiş yapmayı kolaylaştırır.

# Postman Üzerinden BaseURL Nasıl Tanımlanır?

![Picture description](assets\img\posts\postman-api-test\base-url.jpg){: .center-image }

Postman açtığımızda “Environments” tıklayıp oradan “Create Environments” demeliyiz.

![Picture description](assets\img\posts\postman-api-test\base-url-envenrioment.jpg){: .center-image }

Create Environments dedikten sonra işlem yapacağımız sayfa açılır ve biz baseURL hangi ortamda kullanılacaksa dosya adına onu yazabiliriz. Ben “Maintenance” yazdım.

Hemen sağ tarafta Variable kısmına sabit url olarak kullanacağımız URL kısaltma adını belirtebiliriz. Ben “baseURL” olarak belirttim.

Type alanı default olarak seçili kalabilir aynı zamanda secret(gizli) olarak da belirtebilirsiniz.

İnitial Value her çağrımızda sabit URL i yazıyoruz. ben testlerimi “https://reqres.in/” yaptığım için onu yazıyorum. Aynı şekilde Current Value kısmında aynı URL otomatik olarak yazılacaktır.

Son adım ise sağ üst köşeden yaptığımız işlemleri “Save” diyerek kayıt etmektir.

**Şimdi Environment ‘ı Maintenance olan ortamda sabit URL’imizide baseURL olarak kısalttığımız çağrılarımızı nasıl yapıyoruz görelim.**

![Picture description](assets\img\posts\postman-api-test\base-url-cagri.jpg){: .center-image }

Collection olarak yaptığımız testlerde hep sabit olan URL bilgisini Environment ortamında baseURL olarak tanımlamıştık.

Şimdi bu baseURL artık kullanabiliyoruz. Tanımı yaptığımız baseURL’i, URL satırında çağırırken {{baseURL}} şeklinde yazılmalıdır. burada Variable tanımladığımız ismi iki süslü parantez (curly brace) ile açıp iki curly brace ile kapatıp şekilde yazmalıyız.

**Önemli bir nokta ise biz Environment tanımı “Maintenance” olarak belirttiğimiz için sağ üst köşeden Environment olarak Maintenance seçili olması gerekmektedir. Farklı bir ortam seçiliyse baseURL çağrısı atıldığında çağrı başarısız olacaktır.**
