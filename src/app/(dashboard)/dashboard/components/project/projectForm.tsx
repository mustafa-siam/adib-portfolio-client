'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {
  Loader2,
  Save,
  X,
  Scissors,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Star,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createEmptyProjectFormValues, ProjectFormValues } from './projectFormUtils';

interface Props {
  initialValues?: Partial<ProjectFormValues>;
  mode: 'create' | 'edit';
  submitLabel: string;
  submittingLabel: string;
  isLoading?: boolean;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel?: () => void;
}

const textareaClass =
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export const ProjectForm = ({
  initialValues,
  mode,
  submitLabel,
  submittingLabel,
  isLoading = false,
  onSubmit,
  onCancel,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const slugTouched = useRef(false);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');

  // Poster Image Cropping state
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [crop, setCrop] = useState<Crop>();

  const { register, handleSubmit, watch, setValue, reset, control } =
    useForm<ProjectFormValues>({
      defaultValues: {
        ...createEmptyProjectFormValues(),
        ...initialValues,
      },
    });

  const {
    fields: statFields,
    append: appendStat,
    remove: removeStat,
  } = useFieldArray({ control, name: 'overview.stats' });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({ control, name: 'process.steps' });

  // NOTE: in the edit page, wrap initialValues in useMemo, otherwise this
  // effect re-runs on every render and wipes what the user is typing.
  useEffect(() => {
    reset({
      ...createEmptyProjectFormValues(),
      ...initialValues,
    });

    if (initialValues?.poster && typeof initialValues.poster === 'string') {
      setPreviewUrl(initialValues.poster);
    }
  }, [initialValues, reset]);

  // Revoke blob URL on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const title = watch('title');
  const slug = watch('slug');
  const tags = watch('tags') || [];

  // Auto-generate slug from Title (stops once the user edits the slug manually)
  useEffect(() => {
    if (!title) return;
    if (slugTouched.current) return;
    if (mode === 'edit' && slug) return;

    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    setValue('slug', generated, { shouldDirty: true });
  }, [title, slug, mode, setValue]);

  // Tags
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !tags.includes(trimmed)) {
        setValue('tags', [...tags, trimmed], { shouldDirty: true });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((t) => t !== tagToRemove),
      { shouldDirty: true }
    );
  };

  // Image cropping
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCrop(undefined);
    imgRef.current = null;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result?.toString() || null);
      setShowCrop(true);
    };
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    imgRef.current = e.currentTarget;

    setCrop({ unit: 'px', x: 0, y: 0, width, height });
  };

  const createCroppedImage = async () => {
    if (!imgRef.current || !crop) return;

    setIsCompressing(true);
    const canvas = document.createElement('canvas');
    const image = imgRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelX = crop.unit === '%' ? (crop.x * image.width) / 100 : crop.x;
    const pixelY = crop.unit === '%' ? (crop.y * image.height) / 100 : crop.y;
    const pixelWidth = crop.unit === '%' ? (crop.width * image.width) / 100 : crop.width;
    const pixelHeight = crop.unit === '%' ? (crop.height * image.height) / 100 : crop.height;

    canvas.width = Math.floor(pixelWidth * scaleX);
    canvas.height = Math.floor(pixelHeight * scaleY);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsCompressing(false);
      return;
    }

    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      image,
      pixelX * scaleX,
      pixelY * scaleY,
      pixelWidth * scaleX,
      pixelHeight * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const getBlob = (quality: number): Promise<Blob | null> =>
      new Promise((resolve) => {
        canvas.toBlob((b) => resolve(b), 'image/jpeg', quality);
      });

    try {
      let finalBlob = await getBlob(1.0);
      if (finalBlob) {
        const oneMegabyte = 1024 * 1024;
        finalBlob = await getBlob(finalBlob.size > 3 * oneMegabyte ? 0.75 : 0.85);
      }

      if (finalBlob) {
        const file = new File([finalBlob], 'project-poster.jpg', { type: 'image/jpeg' });

        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const url = URL.createObjectURL(finalBlob);
        objectUrlRef.current = url;

        setCroppedFile(file);
        setPreviewUrl(url);
        setShowCrop(false);
      }
    } catch (err) {
      console.error('Failed to compress image:', err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleRemovePoster = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setCroppedFile(null);
    setPreviewUrl(null);
    setImageSrc(null);
    setValue('poster', '', { shouldDirty: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitForm = async (values: ProjectFormValues) => {
    setValidationError(null);

    const fail = (msg: string) => {
      setValidationError(msg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Required fields (mirrors the backend zod schema)
    if (!values.title?.trim() || !values.category?.trim() || !values.summary?.trim()) {
      return fail('Please fill in Title, Category and Summary.');
    }
    if (!values.slug?.trim()) {
      return fail('Slug is required.');
    }
    if (!values.tags || values.tags.length === 0) {
      return fail('Please add at least one tag.');
    }
    if (!values.overview?.heading?.trim() || !values.overview?.description?.trim()) {
      return fail('Please fill in the Overview heading and description.');
    }
    if (!values.process?.heading?.trim() || !values.process?.description?.trim()) {
      return fail('Please fill in the Process heading and description.');
    }

    // Drop fully blank stat/step rows, require completeness for the rest
    const stats = (values.overview.stats || []).filter(
      (s) => s.value?.trim() || s.label?.trim()
    );
    if (stats.some((s) => !s.value?.trim() || !s.label?.trim())) {
      return fail('Each Key Stat needs both a value and a label.');
    }

    const steps = (values.process.steps || []).filter(
      (s) => s.title?.trim() || s.description?.trim()
    );
    if (steps.some((s) => !s.number?.trim() || !s.title?.trim() || !s.description?.trim())) {
      return fail('Each Process Step needs a number, title and description.');
    }

    // Testimonial is optional, but must be complete if any field is filled
    const t = values.testimonial;
    const hasTestimonial = !!t && (t.quote || t.author || t.role || t.avatar);
    if (hasTestimonial && (!t!.quote || !t!.author || !t!.role || !t!.avatar)) {
      return fail('Testimonial needs quote, author, role and avatar URL (or leave all empty).');
    }

    const fd = new FormData();
    fd.append('slug', values.slug);
    fd.append('title', values.title);
    fd.append('category', values.category);
    fd.append('summary', values.summary);
    fd.append('videoUrl', values.videoUrl || '');
    fd.append('clientBadge', values.clientBadge || '');
    fd.append('roleBadge', values.roleBadge || '');
    fd.append('liveLink', values.liveLink || '');
    fd.append('isFeatured', String(values.isFeatured));

    fd.append('tags', JSON.stringify(values.tags));
    fd.append('overview', JSON.stringify({ ...values.overview, stats }));
    fd.append('process', JSON.stringify({ ...values.process, steps }));
    if (hasTestimonial) {
      fd.append('testimonial', JSON.stringify(t));
    }

    if (croppedFile) {
      fd.append('poster', croppedFile);
    } else {
      // existing URL, or '' when the poster was removed
      fd.append('poster', values.poster || '');
    }

    await onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full space-y-8">
      {validationError && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={16} className="shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Basic Information */}
      <div className="space-y-4 border rounded-xl p-5 bg-card">
        <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Project Title *</Label>
            <Input {...register('title')} placeholder="e.g., E-Commerce Platform" />
          </div>

          <div className="space-y-2">
            <Label>Slug (Auto-generated) *</Label>
            <Input
              {...register('slug', {
                onChange: () => {
                  slugTouched.current = true;
                },
              })}
              placeholder="e-commerce-platform"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Category *</Label>
            <Input {...register('category')} placeholder="e.g., Web Development" />
          </div>

          <div className="space-y-2">
            <Label>Client Badge</Label>
            <Input {...register('clientBadge')} placeholder="e.g., Enterprise Client" />
          </div>

          <div className="space-y-2">
            <Label>Role Badge</Label>
            <Input {...register('roleBadge')} placeholder="e.g., Lead Developer" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <ExternalLink size={14} /> Live Project Link
            </Label>
            <Input {...register('liveLink')} placeholder="https://example.com" />
          </div>

          <div className="space-y-2">
            <Label>Video URL</Label>
            <Input {...register('videoUrl')} placeholder="https://youtube.com/watch?v=..." />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>Tags * (Press Enter or comma to add)</Label>
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type tag and press enter..."
          />
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  aria-label={`Remove tag ${tag}`}
                  className="hover:text-destructive"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <Label>Summary *</Label>
          <textarea
            {...register('summary')}
            placeholder="Enter a brief summary of the project..."
            rows={3}
            className={textareaClass}
          />
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="isFeatured"
            {...register('isFeatured')}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="isFeatured" className="flex items-center gap-1.5 cursor-pointer">
            <Star size={16} className="text-amber-500" /> Feature this project on homepage
          </Label>
        </div>
      </div>

      {/* Project Overview Section */}
      <div className="space-y-4 border rounded-xl p-5 bg-card">
        <h3 className="text-lg font-semibold border-b pb-2">Overview Section</h3>
        <div className="space-y-2">
          <Label>Overview Heading *</Label>
          <Input {...register('overview.heading')} placeholder="e.g., Project Overview" />
        </div>

        <div className="space-y-2">
          <Label>Overview Description *</Label>
          <textarea
            {...register('overview.description')}
            placeholder="Detailed overview description..."
            rows={4}
            className={textareaClass}
          />
        </div>

        {/* Dynamic Key Stats */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <Label className="font-semibold">Key Stats</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendStat({ value: '', label: '' })}
            >
              <Plus size={14} className="mr-1" /> Add Stat
            </Button>
          </div>

          {statFields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-center">
              <Input
                {...register(`overview.stats.${index}.value`)}
                placeholder="Value (e.g., 99%)"
                className="w-1/3"
              />
              <Input
                {...register(`overview.stats.${index}.label`)}
                placeholder="Label (e.g., Customer Satisfaction)"
                className="w-2/3"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeStat(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Project Process Section */}
      <div className="space-y-4 border rounded-xl p-5 bg-card">
        <h3 className="text-lg font-semibold border-b pb-2">Process Section</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Process Heading *</Label>
            <Input {...register('process.heading')} placeholder="e.g., How We Built It" />
          </div>

          <div className="space-y-2">
            <Label>Process Image URL</Label>
            <Input {...register('process.image')} placeholder="https://example.com/process.jpg" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Process Description *</Label>
          <textarea
            {...register('process.description')}
            placeholder="Describe the overall strategy and process..."
            rows={3}
            className={textareaClass}
          />
        </div>

        {/* Dynamic Process Steps */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <Label className="font-semibold">Process Steps</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendStep({
                  number: String(stepFields.length + 1).padStart(2, '0'),
                  title: '',
                  description: '',
                })
              }
            >
              <Plus size={14} className="mr-1" /> Add Step
            </Button>
          </div>

          {stepFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-3 relative bg-muted/20">
              <button
                type="button"
                onClick={() => removeStep(index)}
                aria-label={`Remove step ${index + 1}`}
                className="absolute top-3 right-3 text-destructive hover:opacity-80"
              >
                <Trash2 size={16} />
              </button>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Step No.</Label>
                  <Input {...register(`process.steps.${index}.number`)} placeholder="01" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <Label className="text-xs">Step Title</Label>
                  <Input
                    {...register(`process.steps.${index}.title`)}
                    placeholder="e.g., Discovery & Research"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Step Description</Label>
                <textarea
                  {...register(`process.steps.${index}.description`)}
                  placeholder="Details about this step..."
                  rows={2}
                  className={textareaClass}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="space-y-4 border rounded-xl p-5 bg-card">
        <h3 className="text-lg font-semibold border-b pb-2">Client Testimonial (Optional)</h3>
        <div className="space-y-2">
          <Label>Quote</Label>
          <textarea
            {...register('testimonial.quote')}
            placeholder="e.g., Working with this team was seamless..."
            rows={3}
            className={textareaClass}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Author Name</Label>
            <Input {...register('testimonial.author')} placeholder="e.g., Jane Doe" />
          </div>

          <div className="space-y-2">
            <Label>Role / Title</Label>
            <Input {...register('testimonial.role')} placeholder="e.g., CTO at Acme" />
          </div>

          <div className="space-y-2">
            <Label>Avatar Image URL</Label>
            <Input
              {...register('testimonial.avatar')}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
        </div>
      </div>

      {/* Poster Image Upload & Preview */}
      <div className="space-y-4 border rounded-xl p-5 bg-card">
        <h3 className="text-lg font-semibold border-b pb-2">Poster Image</h3>
        <div className="space-y-2">
          <Label>Project Poster Image</Label>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="cursor-pointer"
          />
        </div>

        {previewUrl && (
          <div className="flex items-center gap-4 pt-2">
            <div className="relative group w-40 h-28 overflow-hidden rounded-lg border bg-slate-100">
              <img src={previewUrl} alt="Poster Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={handleRemovePoster}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Action Buttons */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>

        <Button type="submit" disabled={isLoading || isCompressing}>
          {isLoading || isCompressing ? (
            <>
              <Loader2 className="animate-spin mr-2" size={16} />
              {submittingLabel}
            </>
          ) : (
            <>
              <Save className="mr-2" size={16} />
              {submitLabel}
            </>
          )}
        </Button>
      </div>

      {/* Image Crop Modal */}
      {showCrop && imageSrc && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50 dark:bg-slate-800">
              <h3 className="font-bold">Crop Poster Image</h3>
              <button
                type="button"
                onClick={() => setShowCrop(false)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 bg-slate-950 overflow-hidden">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                keepSelection
                className="max-h-[60vh] flex items-center justify-center"
              >
                <img
                  src={imageSrc}
                  onLoad={onImageLoad}
                  alt="Crop source"
                  className="max-h-[60vh] w-auto object-contain mx-auto"
                />
              </ReactCrop>
            </div>

            <div className="p-4 flex justify-end gap-3 border-t">
              {/* type="button" is critical: these live inside the <form> */}
              <Button type="button" variant="outline" onClick={() => setShowCrop(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={createCroppedImage}
                disabled={isCompressing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isCompressing ? (
                  <Loader2 className="animate-spin mr-2" size={16} />
                ) : (
                  <Scissors className="mr-2" size={16} />
                )}
                Apply & Compress
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};