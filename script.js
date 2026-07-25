// Verileri localStorage'da tutma
let talebeler = JSON.parse(localStorage.getItem('talebeler')) || [];

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    updateTalebeCount();
    
    // Form submit
    document.getElementById('talebeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        talebeEkle();
    });
    
    // Modal işlemleri
    const modal = document.getElementById('talebeModal');
    const btn = document.getElementById('talebeListBtn');
    const span = document.getElementsByClassName('close')[0];
    
    btn.onclick = function() {
        modal.style.display = 'block';
        talebeleriGoster();
    }
    
    span.onclick = function() {
        modal.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

// Talebe ekleme
function talebeEkle() {
    const ad = document.getElementById('ad').value;
    const soyad = document.getElementById('soyad').value;
    const sinif = document.getElementById('sinif').value;
    
    const yeniTalebe = {
        id: Date.now(),
        ad: ad,
        soyad: soyad,
        sinif: sinif,
        mulakatYapildi: false,
        mulakatNotu: ''
    };
    
    talebeler.push(yeniTalebe);
    localStorage.setItem('talebeler', JSON.stringify(talebeler));
    
    // Formu temizle
    document.getElementById('talebeForm').reset();
    
    // Sayacı güncelle
    updateTalebeCount();
    
    // Başarı mesajı
    alert('✅ Talebe başarıyla eklendi!');
}

// Talebe sayısını güncelleme
function updateTalebeCount() {
    document.getElementById('talebeCount').textContent = talebeler.length;
}

// Talebeler listesini gösterme
function talebeleriGoster() {
    const listDiv = document.getElementById('talebeListesi');
    
    if (talebeler.length === 0) {
        listDiv.innerHTML = `
            <div class="empty-state">
                <h3 style="font-size: 48px;">📋</h3>
                <p>Henüz talebe eklenmemiş</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    talebeler.forEach(talebe => {
        html += `
            <div class="talebe-card">
                <div class="talebe-header">
                    <div class="talebe-info">
                        <strong>AD SOYAD</strong>
                        <span>${talebe.ad} ${talebe.soyad}</span>
                    </div>
                    <div class="talebe-info">
                        <strong>SINIF</strong>
                        <span>${talebe.sinif}. Sınıf</span>
                    </div>
                    <div class="mulakat-checkbox">
                        <input type="checkbox" 
                               id="mulakat_${talebe.id}" 
                               ${talebe.mulakatYapildi ? 'checked' : ''}
                               onchange="mulakatDurumDegistir(${talebe.id})">
                        <label for="mulakat_${talebe.id}">Mülakat</label>
                    </div>
                    <button class="btn-sil" onclick="talebeSil(${talebe.id})">🗑️ Sil</button>
                </div>
                <div class="mulakat-notlar">
                    <strong>MÜLAKAT NOTU</strong>
                    <textarea 
                        placeholder="Mülakat notlarınızı buraya yazabilirsiniz..."
                        onchange="mulakatNotuGuncelle(${talebe.id}, this.value)"
                    >${talebe.mulakatNotu || ''}</textarea>
                </div>
            </div>
        `;
    });
    
    listDiv.innerHTML = html;
}

// Mülakat durumu değiştirme
function mulakatDurumDegistir(id) {
    const talebe = talebeler.find(t => t.id === id);
    if (talebe) {
        talebe.mulakatYapildi = !talebe.mulakatYapildi;
        localStorage.setItem('talebeler', JSON.stringify(talebeler));
    }
}

// Mülakat notu güncelleme
function mulakatNotuGuncelle(id, not) {
    const talebe = talebeler.find(t => t.id === id);
    if (talebe) {
        talebe.mulakatNotu = not;
        localStorage.setItem('talebeler', JSON.stringify(talebeler));
    }
}

// Talebe silme
function talebeSil(id) {
    if (confirm('Bu talebeyi silmek istediğinizden emin misiniz?')) {
        talebeler = talebeler.filter(t => t.id !== id);
        localStorage.setItem('talebeler', JSON.stringify(talebeler));
        talebeleriGoster();
        updateTalebeCount();
    }
}
