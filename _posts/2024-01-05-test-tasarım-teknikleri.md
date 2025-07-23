---
title: 'Test Tasarım Teknikleri'
date: 2024-01-05T00:00:00+00:00
author: Reşat Kavcı
layout: post
permalink: /test-tasarım-teknikleri/
categories: yazilimtest
tags: [Test, QA, Testing, Black Box Testing, White Box Testing]
img: /assets/img/posts/software-development-life-cycle/yazılım-yasam-döngüsü-asamaları.jpg
description: 'test tasarım teknikleri nelerdir'
excerpt: 'Test tasarım teknikleri, yazılım test süreçlerinde etkili test senaryoları oluşturmak için kullanılan sistematik yaklaşımlardır. Bu yazımda en yaygın kullanılan test tasarım tekniklerini detaylı olarak inceleyeceğiz.'
---

Test tasarım teknikleri, Yazılım testlerinde kullanılan senaryo ve durumları oluşturan yöntemleri ifade eder. Bu teknikler, Yazılımın doğruluğunu kontrol etmek, hataları bulmak ve gereksinimlere uygunluğunu doğrulamak amacıyla kullanılır. Yazılım test sürecini daha sistemli, etkili ve kapsamlı hale getirmeye yardımcı olurlar.

_Test tekniğinin amacı, test koşullarını, test senaryolarını ve test verilerini belirlemeye yardımcı olmaktır._

![Picture description](assets\img\posts\test-tasarım-teknikleri\test-tasarım-semasi.jpg){: .center-image }

Şimdi gelelim yukarıdaki şemada belirtilen durumları örneklerle açıklamaya..

# Dinamik Test Teknikleri

## Kara Kutu(Black Box Testing) Test Tekniği

Kara kutu testi, yazılımın iç yapısına bakılmadan sadece girdi ve çıktıları kullanarak sistemin işlevselliğini değerlendiren bir test tekniğidir. Bu yöntemde, sistemin gereksinimleri karşılayıp karşılamadığı ölçümlenir ve beklenmeyen çıktılar da test edilir.

Kara kutu test tekniği kendi içinde 5'e ayrılır.

### Denklik Paylarına Ayırma

Denklik payları, yazılım testlerinde verileri belirli sınıflara ayırarak benzer şekilde ele almayı sağlar. Geçerli denklik payları, kabul edilen değerleri içerirken, geçersiz denklik payları reddedilen değerleri temsil eder. Girdiler, çıktılar, dahili değerler ve zamanla ilgili veriler için denklik payları belirlenebilir. Bu paylar, gerektiğinde alt-paylara ayrılabilir, ancak her bir değer yalnızca bir denklik payına ait olmalıdır. Geçersiz denklik payları, test senaryolarında ayrı ayrı test edilmeli ve birleştirilmemelidir, böylece arızalar maskelenmez ve tespit edilmesi zorlaşmaz.

_Denklik paylarında hem geçerli hem de geçersiz değerler vardır._
**Geçerli değerler**, _birim veya sistem kapsamına giren, yazılım tarafından kabul edilmesi beklenen değerlerdir. Geçerli değerler içeren bir denklik payına “geçerli denklik payı” denir._
**Geçersiz değerler**, _birim veya sistem kapsamı dışında olan, yazılım tarafından reddedilmesi beklenen değerlerdir. Geçersiz değerler içeren bir denklik payına “geçersiz denklik payı” denir._

_Denklik sınıfında her değer yalnızca bir denklik payına ait olmalıdır, birden fazla payda yer almamalıdır._

Denklik paylarına ayırma tekniğini örnek bir senaryo ile anlatalım.

![Picture description](assets\img\posts\test-tasarım-teknikleri\denklik-payına-ayırma.jpg){: .center-image }

Denklik değeri : **Geçerli Yaş Aralığı**
Girdi değeri : 18, 25, 30
Açıklama: Uygulama, 18 ile 30 yaş arasındaki geçerli yaşları kabul etmelidir.

Denklik değeri : **Alt Yaş Sınırı**
Girdi değeri : 17, 16, 10
Açıklama: Uygulama, 18 yaş altındaki yaş girişlerini reddetmelidir.

Denklik değeri : **Üst Yaş Sınırı**
Girdi değeri : 31, 35, 40
Açıklama: Uygulama, 30 yaş üstündeki yaş girişlerini reddetmelidir.

Denklik değeri : **Geçersiz Karakterler**
Girdi değeri : “abc”, “#$%”, “xyz”
Açıklama: Uygulama, geçersiz karakter içeren yaş girişlerini reddetmelidir.

Bu denklik payları, uygulamanın belirli bir yaş aralığını doğru bir şekilde kontrol etmesini sağlamak üzere tasarlanmıştır. Kullanıcının yaş girişinin hem geçerli hem de geçersiz durumları test edilerek uygulamanın doğru çalışıp çalışmadığı kontrol edildi.

### Sınır Değer Analizi

Sınır Değer Analizi tekniği, tüm test seviyelerinde kullanılabilir ve kolayca uygulanabilir bir yöntemdir. Özellikle Denklik Paylarına Ayırma tekniği ile birlikte kullanıldığında, etkili ve güçlü sonuçlar elde etmek mümkündür. Uygulama kolaylığına rağmen, hata bulma olasılığı oldukça yüksektir.

Yaş aralığı Kontrolü senaryosu ile sınır değer analizini örnekleyelim.

![Picture description](assets\img\posts\test-tasarım-teknikleri\sınır-deger.jpg){: .center-image }

### Karar Tablosu Testi

Karar tablosu test tekniği, karmaşık iş kurallarına sahip sistemlerin test edilmesinde kullanılır. Bu teknik, olasılıkları açıkça listeler ve test sırasında gözden kaçırma olasılığını en aza indirir.

![Picture description](assets\img\posts\test-tasarım-teknikleri\karar-tablosu.jpg){: .center-image }

Yukarıdaki senaryoda Karar Tablosu Testini hadi çıkaralım.

![Picture description](assets\img\posts\test-tasarım-teknikleri\durum-aksiyon-tablosu.jpg){: .center-image }

Bu tabloda kullanıcıdan;
- Kullanıcı adını ve şifresini başarılı girmesi beklenir
- Kullanıcı adını doğru, Şifresini yanlış girmesi istenir
- Kullanıcı adını yanlış, Şifresini doğru girmesi istenmiş
- Kullanıcı adı ve Şifresini yanlış girmesi istenmiş

Bu case adımlarından sonra Başarılı giriş yapabilmesi Kural 1 için sağlanırken diğer tüm Kural adımlarında Başarısız sonuçlanmış ve giriş sağlanamamıştır.

Yukarıdaki tabloyu hızlıca oluşturabiliceğiz https://pairwise.teremokgames.com/ adresine gidip sizlerde inceleyip oluşturabilirsiniz. :smile:

### Durum Geçiş Testi

Durum geçiş testinin amacı, belirli iş kurallarına bağlı olarak bir durumun oluşup, ardından diğer duruma geçerek bir noktada sonlanmasını test etmektir. Bu tip sistemlerde durum geçişleri, genellikle durum geçiş diyagramları ile görselleştirilir.

![Picture description](assets\img\posts\test-tasarım-teknikleri\durum-gecis.jpg){: .center-image }

### Kullanım Senaryosu Testi

Kullanım senaryosu testleri, yazılım ile etkileşimde bulunan farklı kullanıcı profillerini modellemek için kullanılan senaryolardan elde edilir.

Bu test tekniği, özellikle çevik proje yönetimi kullanan firmalarda sıkça kullanılır. Kullanım senaryoları genellikle aktörler, adımlar, açıklamalar ve uç senaryoları kapsamak için eklentiler içerir.

Kullanıcı Senaryo Testi bir ATM başında basit şekilde yapılan kartı takma ve şifre akışı örneğini birlikte inceleyelim.

![Picture description](assets\img\posts\test-tasarım-teknikleri\kullanim-senaryosu.jpg){: .center-image }

## Beyaz Kutu(White Box Testing) Tekniği

Beyaz kutu testleri, geliştirilen sistemin iç yapısını bilerek yapılan bir test tasarım tekniğidir. Bu testler, kod yapısı, veri akışları, kontrol akışları, ifade ve dal kapsama gibi detaylara odaklanır. Beyaz kutu testleri sistemin iç işleyişi ile ilgilenirken, kara kutu testleri işlevselliği test eder ve sistemi bir “siyah kutu” gibi ele alır.

### Komut Testi ve Kapsamı

Komut testi, yazılım kodundaki yürütülebilir komutların incelenip çalıştırılmasını içerir. Kapsam, testler tarafından çalıştırılan komut sayısının, test edilen nesnedeki toplam çalıştırılabilir komut sayısına oranıyla ölçülür. Genellikle yüzde olarak ifade edilir.

### Karar Testi ve Kapsamı

Karar testi, yazılım kodundaki karar noktalarını inceleyip bu kararların çalıştırılması ve elde edilen çıktılara dayanarak kodun test edilmesini içerir. Bu test, test senaryolarının karar noktalarındaki kontrol akışlarını takip etmesini gerektirir. Örneğin, bir IF komutu için doğru ve yanlış çıktıları kapsayan senaryolar ya da bir CASE komutu için tüm olası çıktıları içeren senaryolar olabilir.

Karar testini Java ve Selenium bakışı ile hadi örnekleyelim..

{% highlight java %}

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class KrediBasvuruTest {

    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "chromedriver_path"); // ChromeDriver'ın dosya yolu
        WebDriver driver = new ChromeDriver();

        // Burada uygulama bulamadığım için url bilgisi yer almıyor
        driver.get("web_uygulama_url");

        // Kullanıcı adı ve gelir bilgilerini gir
        WebElement yasInput = driver.findElement(By.id("yas"));
        yasInput.sendKeys("20");

        WebElement gelirInput = driver.findElement(By.id("gelir"));
        gelirInput.sendKeys("3500");

        // Kredi Başvurusu butonuna tıkla
        WebElement basvuruButton = driver.findElement(By.id("basvuruButton"));
        basvuruButton.click();

        // Sonucu kontrol et
        WebElement sonucLabel = driver.findElement(By.id("sonuc"));
        String sonuc = sonucLabel.getText();
        System.out.println("Kredi Onay Sonucu: " + sonuc);

        // Tarayıcıyı kapat
        driver.quit();
    }
}

{% endhighlight %}

Yukarıda Java ve Selenium ile basit bir örnekleme sağladım. Buradaki kod’un anlamı web uygulamasının içinde yaş ve gelir bilgilerini girdikten sonra Kredi Başvurusu butonuna tıklayarak sonucu kontrol ediyoruz.

### Komut ve Karar Testleri

Komut testi, yazılımın içindeki yürütülebilir komutların test edilmesini içerir. Bu test türü, basit şekilde her bir komutun doğru bir şekilde çalışıp çalışmadığını kontrol eder.

Hadi Java ve Selenium ile örnekleyelim..

{% highlight java %}

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class KomutVeKararTesti {

    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "chromedriver_path");
        WebDriver driver = new ChromeDriver();

        // Burada uygulama bulamadığım için url bilgisi yer almıyor
        driver.get("web_uygulama_url");

        // Kullanıcı adı ve gelir bilgilerini gir
        WebElement yasInput = driver.findElement(By.id("yas"));
        yasInput.sendKeys("20");

        WebElement gelirInput = driver.findElement(By.id("gelir"));
        gelirInput.sendKeys("3500");

        // Kredi Başvurusu butonuna tıkla
        WebElement basvuruButton = driver.findElement(By.id("basvuruButton"));
        basvuruButton.click();

        // Sonucu kontrol et
        WebElement sonucLabel = driver.findElement(By.id("sonuc"));
        String sonuc = sonucLabel.getText();
        System.out.println("Kredi Onay Sonucu: " + sonuc);

        // Tarayıcıyı kapat
        driver.quit();
    }
}

{% endhighlight %}

Yukarıda ki komut adımlarısendKeys ve click gibi Selenium komutlarını kullanarak web uygulamasındaki komutları test eder.Aynı zamanda karar testi olarak, kredi başvurusu sonucunu kontrol ederek if ve switch yapılarının doğru çalışıp çalışmadığını kontrol eder.

## Tecrübeye Dayalı Teknikler
Tecrübeye dayalı test teknikleri, test koşulları, test senaryoları ve test verileri; test uzmanlarının, yazılımcıların, kullanıcıların ve diğer paydaşların bilgi ve tecrübelerini içeren bir test esasından elde edilir.

## Statik Test Teknikleri
Statik test teknikleri, kodun ya da belgenin derlenmeden veya çalıştırılmadan önce incelenmesidir. Aslındabu teknikler yazılımın daha erken aşamalarda ve geliştirme sürecinin içinde hataları tespit etmeye yarar.