import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadBrandAsset } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const assetType = formData.get('assetType') as 'logo' | 'favicon' | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (assetType !== 'logo' && assetType !== 'favicon') {
      return NextResponse.json({ error: 'Invalid asset type' }, { status: 400 });
    }

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/x-icon',
      'image/vnd.microsoft.icon',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Use JPEG, PNG, GIF, WEBP or ICO.' },
        { status: 400 }
      );
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 2MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await uploadBrandAsset(buffer, assetType, session.user.id);

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      message: 'Branding asset uploaded successfully',
    });
  } catch (error) {
    console.error('Branding upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
