import { useEffect, useState } from 'react';
import { ArrowLeft, Check, ImagePlus, Plus, Save, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import initialContent from '../data/siteContent.json';
import './Admin.css';

const clone = (value) => structuredClone(value);

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result).split(',')[1]);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const TextField = ({ label, value, onChange, multiline = false }) => (
  <label className="admin-field">
    <span>{label}</span>
    {multiline ? (
      <textarea value={value ?? ''} onChange={(event) => onChange(event.target.value)} rows={4} />
    ) : (
      <input value={value ?? ''} onChange={(event) => onChange(event.target.value)} />
    )}
  </label>
);

const ImageField = ({ label, value, onChange, onUpload }) => (
  <div className="admin-image-field">
    <img src={value} alt="" />
    <div>
      <TextField label={label} value={value} onChange={onChange} />
      <label className="admin-upload-button">
        <ImagePlus size={16} /> Upload image
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file, onChange);
            event.target.value = '';
          }}
        />
      </label>
    </div>
  </div>
);

const emptyCaseStudy = (number) => ({
  id: `new-case-study-${Date.now()}`,
  number: String(number).padStart(2, '0'),
  title: 'New Case Study',
  subtitle: 'Project subtitle',
  summary: 'Short project summary.',
  tags: ['Strategy', 'Creative'],
  client: 'Client name',
  category: 'Project category',
  period: String(new Date().getFullYear()),
  services: 'Strategy, creative direction',
  challenge: 'Describe the challenge.',
  approach: 'Describe the approach.',
  metrics: [['100%', 'primary result'], ['2x', 'secondary result']],
  tone: 'stone',
  image: '/project-images/hero-image.webp',
  imagePosition: 'center center',
  gallery: [
    { src: '/project-images/hero-image.webp', position: 'center center' },
    { src: '/project-images/mockup-28.webp', position: 'center center' },
    { src: '/project-images/free-iphone-air.webp', position: 'center center' },
  ],
});

const Admin = () => {
  const [content, setContent] = useState(() => clone(initialContent));
  const [activeTab, setActiveTab] = useState('media');
  const [status, setStatus] = useState(() => sessionStorage.getItem('bragit-admin-status') || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/content', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load local content');
        return response.json();
      })
      .then(setContent)
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus(error.message);
      });
    return () => controller.abort();
  }, []);

  const updateArrayItem = (section, index, field, value) => {
    setContent((current) => {
      const next = clone(current);
      next[section][index][field] = value;
      return next;
    });
  };

  const uploadImage = async (file, onChange) => {
    setStatus(`Uploading ${file.name}...`);
    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: file.name, type: file.type, data: await fileToBase64(file) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Upload failed');
      onChange(result.path);
      setStatus('Image uploaded. Save changes to publish it.');
    } catch (error) {
      setStatus(error.message);
    }
  };

  const saveContent = async () => {
    setIsSaving(true);
    setStatus('Saving...');
    sessionStorage.setItem('bragit-admin-status', 'Saving...');
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Save failed');
      const successMessage = 'Saved permanently to the project.';
      sessionStorage.setItem('bragit-admin-status', successMessage);
      setStatus(successMessage);
    } catch (error) {
      sessionStorage.setItem('bragit-admin-status', error.message);
      setStatus(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const renderMedia = () => (
    <div className="admin-stack">
      <section className="admin-panel">
        <h2>Homepage</h2>
        <ImageField
          label="Main showcase image"
          value={content.home.showcaseImage}
          onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, showcaseImage: value } }))}
          onUpload={uploadImage}
        />
        <TextField
          label="About marketing copy"
          value={content.home.aboutLead}
          multiline
          onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, aboutLead: value } }))}
        />
        <div className="admin-card-grid">
          {content.home.aboutStats.map((stat, index) => (
            <div className="admin-subcard" key={`stat-${index}`}>
              <TextField label="Stat label" value={stat.label} onChange={(value) => setContent((current) => { const next = clone(current); next.home.aboutStats[index].label = value; return next; })} />
              <div className="admin-grid-two">
                <TextField label="Value" value={stat.value} onChange={(value) => setContent((current) => { const next = clone(current); next.home.aboutStats[index].value = Number(value) || 0; return next; })} />
                <TextField label="Suffix" value={stat.suffix} onChange={(value) => setContent((current) => { const next = clone(current); next.home.aboutStats[index].suffix = value; return next; })} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-panel">
        <h2>About page images</h2>
        <ImageField
          label="About hero image"
          value={content.about.heroImage}
          onChange={(value) => setContent((current) => ({ ...current, about: { ...current.about, heroImage: value } }))}
          onUpload={uploadImage}
        />
        {content.about.ribbonImages.map((image, index) => (
          <ImageField
            key={`ribbon-${index}`}
            label={`Ribbon image ${index + 1}`}
            value={image}
            onChange={(value) => setContent((current) => {
              const next = clone(current);
              next.about.ribbonImages[index] = value;
              return next;
            })}
            onUpload={uploadImage}
          />
        ))}
        {content.about.valueImages.map((image, index) => (
          <ImageField
            key={`value-${index}`}
            label={`Core value image ${index + 1}`}
            value={image}
            onChange={(value) => setContent((current) => {
              const next = clone(current);
              next.about.valueImages[index] = value;
              return next;
            })}
            onUpload={uploadImage}
          />
        ))}
      </section>

      <section className="admin-panel">
        <h2>Founders</h2>
        {content.founders.map((founder, index) => (
          <div className="admin-subcard" key={founder.name}>
            <ImageField label="Portrait" value={founder.image} onChange={(value) => updateArrayItem('founders', index, 'image', value)} onUpload={uploadImage} />
            <div className="admin-grid-two">
              <TextField label="Name" value={founder.name} onChange={(value) => updateArrayItem('founders', index, 'name', value)} />
              <TextField label="Role" value={founder.role} onChange={(value) => updateArrayItem('founders', index, 'role', value)} />
            </div>
          </div>
        ))}
      </section>

      <section className="admin-panel">
        <h2>Testimonial photos and text</h2>
        <div className="admin-card-grid">
          {content.testimonials.map((item, index) => (
            <div className="admin-subcard" key={item.id}>
              <ImageField label="Photo" value={item.image} onChange={(value) => updateArrayItem('testimonials', index, 'image', value)} onUpload={uploadImage} />
              <TextField label="Name" value={item.name} onChange={(value) => updateArrayItem('testimonials', index, 'name', value)} />
              <TextField label="Title" value={item.title} onChange={(value) => updateArrayItem('testimonials', index, 'title', value)} />
              <TextField label="Quote" value={item.quote} multiline onChange={(value) => updateArrayItem('testimonials', index, 'quote', value)} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderServices = () => (
    <div className="admin-card-grid">
      {content.services.map((service, index) => (
        <section className="admin-panel" key={service.id}>
          <span className="admin-kicker">Service {service.id}</span>
          <TextField label="Title" value={service.title} onChange={(value) => updateArrayItem('services', index, 'title', value)} />
          <TextField label="Description" value={service.desc} multiline onChange={(value) => updateArrayItem('services', index, 'desc', value)} />
          <TextField label="Badges (comma separated)" value={service.tags.join(', ')} onChange={(value) => updateArrayItem('services', index, 'tags', value.split(',').map((tag) => tag.trim()).filter(Boolean))} />
          {service.images.map((image, imageIndex) => (
            <ImageField
              key={`${service.id}-${imageIndex}`}
              label={`Card image ${imageIndex + 1}`}
              value={image}
              onChange={(value) => setContent((current) => {
                const next = clone(current);
                next.services[index].images[imageIndex] = value;
                return next;
              })}
              onUpload={uploadImage}
            />
          ))}
        </section>
      ))}
    </div>
  );

  const renderCaseStudies = () => (
    <div className="admin-stack">
      <button className="admin-add-button" type="button" onClick={() => setContent((current) => ({ ...current, caseStudies: [...current.caseStudies, emptyCaseStudy(current.caseStudies.length + 1)] }))}>
        <Plus size={18} /> Add case study
      </button>
      {content.caseStudies.map((study, index) => (
        <details className="admin-case" key={study.id}>
          <summary><span>{study.number} · {study.title}</span><span>{study.subtitle}</span></summary>
          <div className="admin-case-body">
            <div className="admin-grid-two">
              {['number', 'id', 'title', 'subtitle', 'client', 'category', 'period', 'services', 'tone', 'imagePosition'].map((field) => (
                <TextField key={field} label={field} value={study[field]} onChange={(value) => updateArrayItem('caseStudies', index, field, value)} />
              ))}
            </div>
            {['summary', 'challenge', 'approach'].map((field) => (
              <TextField key={field} label={field} value={study[field]} multiline onChange={(value) => updateArrayItem('caseStudies', index, field, value)} />
            ))}
            <TextField label="Tags (comma separated)" value={study.tags.join(', ')} onChange={(value) => updateArrayItem('caseStudies', index, 'tags', value.split(',').map((tag) => tag.trim()).filter(Boolean))} />
            <ImageField label="Cover image" value={study.image} onChange={(value) => updateArrayItem('caseStudies', index, 'image', value)} onUpload={uploadImage} />

            <h3>Results</h3>
            {study.metrics.map((metric, metricIndex) => (
              <div className="admin-grid-two" key={`metric-${metricIndex}`}>
                <TextField label="Value" value={metric[0]} onChange={(value) => setContent((current) => { const next = clone(current); next.caseStudies[index].metrics[metricIndex][0] = value; return next; })} />
                <TextField label="Result label" value={metric[1]} onChange={(value) => setContent((current) => { const next = clone(current); next.caseStudies[index].metrics[metricIndex][1] = value; return next; })} />
              </div>
            ))}

            <h3>Gallery</h3>
            {study.gallery.map((image, imageIndex) => (
              <ImageField
                key={`gallery-${imageIndex}`}
                label={`Gallery image ${imageIndex + 1}`}
                value={image.src}
                onChange={(value) => setContent((current) => { const next = clone(current); next.caseStudies[index].gallery[imageIndex].src = value; return next; })}
                onUpload={uploadImage}
              />
            ))}

            <button className="admin-delete-button" type="button" onClick={() => setContent((current) => ({ ...current, caseStudies: current.caseStudies.filter((_, itemIndex) => itemIndex !== index) }))}>
              <Trash2 size={16} /> Delete case study
            </button>
          </div>
        </details>
      ))}
    </div>
  );

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <Link to="/" className="admin-back"><ArrowLeft size={16} /> Website</Link>
          <span className="admin-eyebrow">Local content manager</span>
          <h1>Bragit Admin</h1>
          <p>Changes are written into the project and included in your next deployment.</p>
        </div>
        <button className="admin-save-button" type="button" onClick={saveContent} disabled={isSaving}>
          {isSaving ? <Save size={18} /> : <Check size={18} />} {isSaving ? 'Saving...' : 'Save changes'}
        </button>
      </header>

      <nav className="admin-tabs" aria-label="Admin sections">
        {[
          ['media', 'Images & homepage'],
          ['services', 'Services'],
          ['case-studies', 'Case studies'],
        ].map(([id, label]) => (
          <button type="button" className={activeTab === id ? 'is-active' : ''} onClick={() => setActiveTab(id)} key={id}>{label}</button>
        ))}
      </nav>

      {status && <div className="admin-status" role="status">{status}</div>}
      {activeTab === 'media' && renderMedia()}
      {activeTab === 'services' && renderServices()}
      {activeTab === 'case-studies' && renderCaseStudies()}
    </main>
  );
};

export default Admin;
