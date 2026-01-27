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
const DATA_PATHS = {
    'eleves.json': PUBLIC_DATA_DIR,
    'personnel.json': DATA_DIR,
    'professeurs.json': DATA_DIR,
    'absences.json': DATA_DIR,
    'finances.json': DATA_DIR,
    'emplois.json': DATA_DIR,
    'bulletins.json': DATA_DIR,
    'notes.json': DATA_DIR
};

function resolveDataPath(filename) {
    const baseDir = DATA_PATHS[filename] || DATA_DIR;
    return path.join(baseDir, filename);
}

// Helper functions
function ensureDataFile(filepath) {
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, '[]');
    }
}

function readData(filename) {
    const filepath = resolveDataPath(filename);
    ensureDataFile(filepath);
    const data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data);
}

function writeData(filename, data) {
    const filepath = resolveDataPath(filename);
    ensureDataFile(filepath);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

function getNextId(data) {
    if (data.length === 0) return 1;
    return Math.max(...data.map(item => item.id)) + 1;
}

function generateMatricule9() {
    const base = Math.floor(Math.random() * 1000000000);
    return String(base).padStart(9, '0');
}

// ==================== ROUTES PERSONNEL ====================
app.get('/api/personnel', (req, res) => {
    try {
        const personnel = readData('personnel.json');
        res.json(personnel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/personnel', (req, res) => {
    try {
        const personnel = readData('personnel.json');
        const newPerson = {
            id: getNextId(personnel),
            ...req.body,
            created_at: new Date().toISOString()
        };
        personnel.push(newPerson);
        writeData('personnel.json', personnel);
        res.json({ message: 'Personnel ajouté avec succès', data: newPerson });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/personnel/:id', (req, res) => {
    try {
        const personnel = readData('personnel.json');
        const index = personnel.findIndex(p => p.id === parseInt(req.params.id));
        if (index !== -1) {
            personnel[index] = { ...personnel[index], ...req.body };
            writeData('personnel.json', personnel);
            res.json({ message: 'Personnel mis à jour', data: personnel[index] });
        } else {
            res.status(404).json({ error: 'Personnel non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/personnel/:id', (req, res) => {
    try {
        let personnel = readData('personnel.json');
        personnel = personnel.filter(p => p.id !== parseInt(req.params.id));
        writeData('personnel.json', personnel);
        res.json({ message: 'Personnel supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Compat: anciens endpoints professeurs
app.get('/api/professeurs', (req, res) => {
    try {
        const personnel = readData('personnel.json');
        res.json(personnel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/professeurs', (req, res) => {
    try {
        const personnel = readData('personnel.json');
        const newPerson = {
            id: getNextId(personnel),
            ...req.body,
            created_at: new Date().toISOString()
        };
        personnel.push(newPerson);
        writeData('personnel.json', personnel);
        res.json({ message: 'Personnel ajouté avec succès', data: newPerson });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/professeurs/:id', (req, res) => {
    try {
        const personnel = readData('personnel.json');
        const index = personnel.findIndex(p => p.id === parseInt(req.params.id));
        if (index !== -1) {
            personnel[index] = { ...personnel[index], ...req.body };
            writeData('personnel.json', personnel);
            res.json({ message: 'Personnel mis à jour', data: personnel[index] });
        } else {
            res.status(404).json({ error: 'Personnel non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/professeurs/:id', (req, res) => {
    try {
        let personnel = readData('personnel.json');
        personnel = personnel.filter(p => p.id !== parseInt(req.params.id));
        writeData('personnel.json', personnel);
        res.json({ message: 'Personnel supprimé' });
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
        const matricule = req.body.matricule || generateMatricule9();
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

// ==================== ROUTES ABSENCES ====================
app.get('/api/absences', (req, res) => {
    try {
        const absences = readData('absences.json');
        res.json(absences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/absences', (req, res) => {
    try {
        const absences = readData('absences.json');
        const newAbsence = {
            id: getNextId(absences),
            ...req.body,
            created_at: new Date().toISOString()
        };
        absences.push(newAbsence);
        writeData('absences.json', absences);
        res.json({ message: 'Absence ajoutée avec succès', data: newAbsence });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/absences/:id', (req, res) => {
    try {
        const absences = readData('absences.json');
        const index = absences.findIndex(a => a.id === parseInt(req.params.id));
        if (index !== -1) {
            absences[index] = { ...absences[index], ...req.body };
            writeData('absences.json', absences);
            res.json({ message: 'Absence mise à jour', data: absences[index] });
        } else {
            res.status(404).json({ error: 'Absence non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/absences/:id', (req, res) => {
    try {
        let absences = readData('absences.json');
        absences = absences.filter(a => a.id !== parseInt(req.params.id));
        writeData('absences.json', absences);
        res.json({ message: 'Absence supprimée' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== ROUTES FINANCES ====================
app.get('/api/finances', (req, res) => {
    try {
        const finances = readData('finances.json');
        res.json(finances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/finances', (req, res) => {
    try {
        const finances = readData('finances.json');
        const newFinance = {
            id: getNextId(finances),
            ...req.body,
            created_at: new Date().toISOString()
        };
        finances.push(newFinance);
        writeData('finances.json', finances);
        res.json({ message: 'Paiement enregistré', data: newFinance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/finances/:id', (req, res) => {
    try {
        const finances = readData('finances.json');
        const index = finances.findIndex(f => f.id === parseInt(req.params.id));
        if (index !== -1) {
            finances[index] = { ...finances[index], ...req.body };
            writeData('finances.json', finances);
            res.json({ message: 'Paiement mis à jour', data: finances[index] });
        } else {
            res.status(404).json({ error: 'Paiement non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/finances/:id', (req, res) => {
    try {
        let finances = readData('finances.json');
        finances = finances.filter(f => f.id !== parseInt(req.params.id));
        writeData('finances.json', finances);
        res.json({ message: 'Paiement supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== ROUTES EMPLOI DU TEMPS ====================
app.get('/api/emplois', (req, res) => {
    try {
        const emplois = readData('emplois.json');
        res.json(emplois);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/emplois', (req, res) => {
    try {
        const emplois = readData('emplois.json');
        const newSlot = {
            id: getNextId(emplois),
            ...req.body,
            created_at: new Date().toISOString()
        };
        emplois.push(newSlot);
        writeData('emplois.json', emplois);
        res.json({ message: 'Créneau ajouté', data: newSlot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/emplois/:id', (req, res) => {
    try {
        const emplois = readData('emplois.json');
        const index = emplois.findIndex(e => e.id === parseInt(req.params.id));
        if (index !== -1) {
            emplois[index] = { ...emplois[index], ...req.body };
            writeData('emplois.json', emplois);
            res.json({ message: 'Créneau mis à jour', data: emplois[index] });
        } else {
            res.status(404).json({ error: 'Créneau non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/emplois/:id', (req, res) => {
    try {
        let emplois = readData('emplois.json');
        emplois = emplois.filter(e => e.id !== parseInt(req.params.id));
        writeData('emplois.json', emplois);
        res.json({ message: 'Créneau supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== ROUTES BULLETINS ====================
app.get('/api/bulletins', (req, res) => {
    try {
        const bulletins = readData('bulletins.json');
        res.json(bulletins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/bulletins', (req, res) => {
    try {
        const bulletins = readData('bulletins.json');
        const newBulletin = {
            id: getNextId(bulletins),
            ...req.body,
            created_at: new Date().toISOString()
        };
        bulletins.push(newBulletin);
        writeData('bulletins.json', bulletins);
        res.json({ message: 'Bulletin généré', data: newBulletin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/bulletins/:id', (req, res) => {
    try {
        const bulletins = readData('bulletins.json');
        const index = bulletins.findIndex(b => b.id === parseInt(req.params.id));
        if (index !== -1) {
            bulletins[index] = { ...bulletins[index], ...req.body };
            writeData('bulletins.json', bulletins);
            res.json({ message: 'Bulletin mis à jour', data: bulletins[index] });
        } else {
            res.status(404).json({ error: 'Bulletin non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/bulletins/:id', (req, res) => {
    try {
        let bulletins = readData('bulletins.json');
        bulletins = bulletins.filter(b => b.id !== parseInt(req.params.id));
        writeData('bulletins.json', bulletins);
        res.json({ message: 'Bulletin supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== ROUTES NOTES ====================
app.get('/api/notes', (req, res) => {
    try {
        const notes = readData('notes.json');
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/notes', (req, res) => {
    try {
        const notes = readData('notes.json');
        const newNote = {
            id: getNextId(notes),
            ...req.body,
            created_at: new Date().toISOString()
        };
        notes.push(newNote);
        writeData('notes.json', notes);
        res.json({ message: 'Note enregistrée', data: newNote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/notes/:id', (req, res) => {
    try {
        const notes = readData('notes.json');
        const index = notes.findIndex(n => n.id === parseInt(req.params.id));
        if (index !== -1) {
            notes[index] = { ...notes[index], ...req.body };
            writeData('notes.json', notes);
            res.json({ message: 'Note mise à jour', data: notes[index] });
        } else {
            res.status(404).json({ error: 'Note non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/notes/:id', (req, res) => {
    try {
        let notes = readData('notes.json');
        notes = notes.filter(n => n.id !== parseInt(req.params.id));
        writeData('notes.json', notes);
        res.json({ message: 'Note supprimée' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== ROUTES STATISTIQUES ====================
app.get('/api/stats', (req, res) => {
    try {
        const personnel = readData('personnel.json');
        const eleves = readData('eleves.json');
        const finances = readData('finances.json');

        const totalPercu = finances.reduce((sum, item) => {
            const montant = Number(item.montant_paye || item.montantPaye || 0);
            return sum + (Number.isNaN(montant) ? 0 : montant);
        }, 0);
        
        const stats = {
            professeurs_presents: personnel.filter(p => p.presence_effective === 'oui' || p.statut === 'actif').length,
            total_professeurs: personnel.length,
            total_eleves: eleves.length,
            eleves_insolvables: eleves.filter(e => e.statut_financier === 'insolvable').length,
            total_percu: totalPercu
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
