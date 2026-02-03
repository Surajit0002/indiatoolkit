import { NextResponse } from 'next/server';
import { advancedTools } from '../../../data/advancedTools';
import { categories } from '../../../data/categories';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort') || 'popular';
  const limit = searchParams.get('limit');

  let tools = [...advancedTools];

  // Filter by category
  if (category && category !== 'all') {
    tools = tools.filter(tool => tool.category === category);
  }

  // Filter by search term
  if (search) {
    const searchTerm = search.toLowerCase();
    tools = tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Sort tools
  tools.sort((a, b) => {
    switch (sort) {
      case 'popular':
        return (b.popularity || 0) - (a.popularity || 0);
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Apply limit
  if (limit) {
    const limitNum = parseInt(limit);
    tools = tools.slice(0, limitNum);
  }

  return NextResponse.json({
    tools,
    categories,
    total: tools.length,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, category' },
        { status: 400 }
      );
    }

    // Create new tool
    const newTool = {
      id: `tool_${Date.now()}`,
      name: body.name,
      description: body.description,
      category: body.category,
      icon: body.icon || '⚙️',
      tags: body.tags || [],
      rating: body.rating || 0,
      popularity: body.popularity || 0,
      users: body.users || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updated: 'Just now'
    };

    // In a real application, you would save this to a database
    // For now, we'll just return the created tool
    return NextResponse.json({
      success: true,
      tool: newTool,
      message: 'Tool created successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create tool' },
      { status: 500 }
    );
  }
}