const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Data directories
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DATA_DIR = path.join(__dirname, 'public');

// Helper functions
function readData(filename) {
    const filepath = filename === 'eleves.json'
        ? path.join(PUBLIC_DATA_DIR, filename)
        : path.join(DATA_DIR, filename);
    const data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data);
}

function writeData(filename, data) {
    const filepath = filename === 'eleves.json'
        ? path.join(PUBLIC_DATA_DIR, filename)
        : path.join(DATA_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

function getNextId(data) {
    if (data.length === 0) return 1;
    return Math.max(...data.map(item => item.id)) + 1;
}

// ==================== ROUTES PROFESSEURS ====================
app.get('/api/professeurs', (req, res) => {
    try {
        const professeurs = readData('professeurs.json');
        res.json(professeurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/professeurs', (req, res) => {
    try {
        const professeurs = readData('professeurs.json');
        const newProf = {
            id: getNextId(professeurs),
            ...req.body,
            created_at: new Date().toISOString()
        };
        professeurs.push(newProf);
        writeData('professeurs.json', professeurs);
        res.json({ message: 'Professeur ajouté avec succès', data: newProf });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/professeurs/:id', (req, res) => {
    try {
        const professeurs = readData('professeurs.json');
        const index = professeurs.findIndex(p => p.id === parseInt(req.params.id));
        if (index !== -1) {
            professeurs[index] = { ...professeurs[index], ...req.body };
            writeData('professeurs.json', professeurs);
            res.json({ message: 'Professeur mis à jour', data: professeurs[index] });
        } else {
            res.status(404).json({ error: 'Professeur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/professeurs/:id', (req, res) => {
    try {
        let professeurs = readData('professeurs.json');
        professeurs = professeurs.filter(p => p.id !== parseInt(req.params.id));
        writeData('professeurs.json', professeurs);
        res.json({ message: 'Professeur supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== ROUTES ÉLÈVES ====================
app.get('/api/eleves', (req, res) => {
    try {
        const eleves = readData('eleves.json');
        res.json(eleves);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/eleves', (req, res) => {
    try {
        const eleves = readData('eleves.json');
        const matricule = 'MAT' + String(eleves.length + 1).padStart(3, '0');
        const newEleve = {
            id: getNextId(eleves),
            matricule,
            ...req.body,
            created_at: new Date().toISOString()
        };
        eleves.push(newEleve);
        writeData('eleves.json', eleves);
        res.json({ message: 'Élève ajouté avec succès', data: newEleve });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/eleves/:id', (req, res) => {
    try {
        const eleves = readData('eleves.json');
        const index = eleves.findIndex(e => e.id === parseInt(req.params.id));
        if (index !== -1) {
            eleves[index] = { ...eleves[index], ...req.body };
            writeData('eleves.json', eleves);
            res.json({ message: 'Élève mis à jour', data: eleves[index] });
        } else {
            res.status(404).json({ error: 'Élève non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/eleves/:id', (req, res) => {
    try {
        let eleves = readData('eleves.json');
        eleves = eleves.filter(e => e.id !== parseInt(req.params.id));
        writeData('eleves.json', eleves);
        res.json({ message: 'Élève supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== ROUTES STATISTIQUES ====================
app.get('/api/stats', (req, res) => {
    try {
        const professeurs = readData('professeurs.json');
        const eleves = readData('eleves.json');
        
        const stats = {
            professeurs_presents: professeurs.filter(p => p.statut === 'actif').length,
            total_professeurs: professeurs.length,
            total_eleves: eleves.length,
            eleves_insolvables: eleves.filter(e => e.statut_financier === 'insolvable').length,
            total_percu: 485000
        };
        
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║    🎓 LYCÉE PASCAL NJÈRÈ IV - SYSTÈME DE GESTION     ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}\n`);
    console.log('✅ Base de données JSON initialisée');
    console.log('⚠️  Pour arrêter le serveur: CTRL+C\n');
});
