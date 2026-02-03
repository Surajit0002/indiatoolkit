import { NextResponse } from 'next/server';
import { advancedTools } from '../../../../data/advancedTools';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tool = advancedTools.find(t => t.id === params.id);
  
  if (!tool) {
    return NextResponse.json(
      { error: 'Tool not found' },
      { status: 404 }
    );
  }

  // Simulate usage analytics
  const analytics = {
    dailyUsage: Math.floor(Math.random() * 1000) + 100,
    weeklyUsage: Math.floor(Math.random() * 5000) + 500,
    monthlyUsage: Math.floor(Math.random() * 20000) + 2000,
    averageSession: Math.floor(Math.random() * 300) + 60,
    userSatisfaction: Math.floor(Math.random() * 20) + 80
  };

  return NextResponse.json({
    tool: {
      ...tool,
      analytics
    },
    relatedTools: advancedTools
      .filter(t => t.category === tool.category && t.id !== tool.id)
      .slice(0, 3)
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const toolIndex = advancedTools.findIndex(t => t.id === params.id);
    
    if (toolIndex === -1) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    // Update tool
    advancedTools[toolIndex] = {
      ...advancedTools[toolIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      tool: advancedTools[toolIndex],
      message: 'Tool updated successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update tool' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const toolIndex = advancedTools.findIndex(t => t.id === params.id);
  
  if (toolIndex === -1) {
    return NextResponse.json(
      { error: 'Tool not found' },
      { status: 404 }
    );
  }

  // Remove tool
  advancedTools.splice(toolIndex, 1);

  return NextResponse.json({
    success: true,
    message: 'Tool deleted successfully'
  });
}