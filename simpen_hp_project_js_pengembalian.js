const dataPeminjaman = {
            '1': { siswa: 'Ahmad Ridho', kelas: 'XI-A', jamPinjam: '09:30', alasan: 'Tugas Sekolah' },
            '2': { siswa: 'Budi Santoso', kelas: 'X-B', jamPinjam: '08:15', alasan: 'Emergency' },
            '3': { siswa: 'Citra Dewi', kelas: 'XII-C', jamPinjam: '09:45', alasan: 'Main' },
            '4': { siswa: 'Dina Sari', kelas: 'XI-A', jamPinjam: '08:00', alasan: 'Tugas Sekolah' }
        };

        function loadDetailPeminjaman() {
            const id = document.getElementById('peminjaman').value;
            if (id && dataPeminjaman[id]) {
                const data = dataPeminjaman[id];
                document.getElementById('detailSiswa').textContent = data.siswa;
                document.getElementById('detailKelas').textContent = data.kelas;
                document.getElementById('detailJamPinjam').textContent = data.jamPinjam;
                document.getElementById('detailAlasan').textContent = data.alasan;
                document.getElementById('detailCard').style.display = 'block';

                const now = new Date();
                const jam = String(now.getHours()).padStart(2, '0');
                const menit = String(now.getMinutes()).padStart(2, '0');
                document.getElementById('jamKembali').value = jam + ':' + menit;
                calculateDurasi();
            }
        }

        function calculateDurasi() {
            const id = document.getElementById('peminjaman').value;
            if (!id) return;
            
            const jamPinjamText = dataPeminjaman[id].jamPinjam;
            const [hP, mP] = jamPinjamText.split(':').map(Number);
            const jamKembalText = document.getElementById('jamKembali').value;
            if (!jamKembalText) return;
            
            const [hK, mK] = jamKembalText.split(':').map(Number);
            const pinjam = hP * 60 + mP;
            const kembali = hK * 60 + mK;
            const durasi = kembali - pinjam;
            
            if (durasi < 0) return;
            
            const jam = Math.floor(durasi / 60);
            const menit = durasi % 60;
            let text = jam > 0 ? jam + ' jam ' + menit + ' menit' : menit + ' menit';
            
            document.getElementById('durasi').textContent = text;
            document.getElementById('summaryDurasi').textContent = text;
        }

        function handleKondisiChange() {
            const kondisi = document.querySelector('input[name="kondisi"]:checked').value;
            document.getElementById('detailRusakSection').style.display = kondisi !== 'baik' ? 'block' : 'none';
        }

        document.getElementById('jamKembali').addEventListener('change', calculateDurasi);

        document.getElementById('pengembalianForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✓ Pengembalian HP berhasil dicatat!');
            this.reset();
            document.getElementById('detailCard').style.display = 'none';
            document.getElementById('detailRusakSection').style.display = 'none';
        });